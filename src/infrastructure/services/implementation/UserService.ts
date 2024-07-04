import { IUserService } from "../interface/IUserService";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { CustomError } from "../../../config/errors";
import { IUserRepository } from "../../repositories";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { UserMapperResponse } from "../../../domain/mappers/UserMapperResponse";
import { BcryptAdapter } from "../../../config/bcrypt";
import { LoginUserDto } from "../../../domain/dtos/loginUser.dto";
import { IncomingHttpHeaders } from "http";
import { GlobalData, TokenDecoded } from "../../../domain/models/global";
import { jwtAdapter } from "../../../config/jwt";
import { UpdateUserDto } from "../../../domain/dtos/updateUser.dto";
import { UploadImages } from "../../../config/uploadImages";
import { envs } from "../../../config/envs";
import { IMailService } from "../interface/IMailService";
import { SendMailDto } from "../../../domain/dtos/sendMail.dto";

export class UserService implements IUserService {
    constructor(
        private readonly _userRepository: IUserRepository,
        private readonly _emailService: IMailService
    ) { }

    async createUser(user: CreateUserDto): Promise<UserEntity> {

        try {
            const [error, createUserDto] = CreateUserDto.RegisterUser(user);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            const userByEmail = await this._userRepository.findUserByEmail(createUserDto!.email);

            if (userByEmail) throw CustomError.prevalidation('Ya existe un usuario con este email');

            const passwordhash = BcryptAdapter.hash(createUserDto!.password);

            createUserDto!.password = passwordhash;

            const newUser = await this._userRepository.createUser(createUserDto!);

            await this.sendEmailValidationLink(newUser.email);

            return UserMapperResponse.userMapperResponse(newUser);

        } catch (error) {

            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }

    }

    async loginUser(user: CreateUserDto): Promise<UserEntity> {

        try {

            const { password } = user;
            const [error, loginUserDto] = LoginUserDto.LoginUser(user);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            const userByEmail = await this._userRepository.findUserByEmail(loginUserDto!.email);

            if (!userByEmail) throw CustomError.prevalidation('email or password incorrect');

            if (!BcryptAdapter.compare(password, userByEmail.password)) throw CustomError.prevalidation('email or password incorrect 2');

            return UserMapperResponse.userMapperResponse(userByEmail);

        } catch (error) {

            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }

    }

    async getUserById(headers: IncomingHttpHeaders): Promise<UserEntity> {

        try {
            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

            const user = await this._userRepository.getUserById(decodedToken!.data.id);

            if (!user) throw CustomError.prevalidation('user not found');

            return UserMapperResponse.userMapperResponse(user);

        } catch (error) {

            if (error instanceof CustomError) throw error;
            throw CustomError.internal();

        }

    }

    async updateUser(user: UpdateUserDto, files: Express.Multer.File[], headers: IncomingHttpHeaders): Promise<UserEntity> {
        try {
            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

            const userById = await this._userRepository.getUserById(decodedToken!.data.id);

            if (!userById) throw CustomError.prevalidation('usuario no encontrario');

            const [error, userToUpdate] = UpdateUserDto.RegisterUser(user);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            if (user.password) userToUpdate!.password = BcryptAdapter.hash(userToUpdate!.password);

            const urls = await UploadImages.uploadMultiple(files);
            userToUpdate!.img = urls[0];

            const updateUser = await this._userRepository.updateUser(decodedToken!.data.id, userToUpdate!);

            return UserMapperResponse.userMapperResponse(updateUser);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    private sendEmailValidationLink = async( email: string ) => {

        const token = await jwtAdapter.generateToken({ email });
        if ( !token ) throw CustomError.internal('Error getting token');
    
        const link = `${ envs.WEBSERVICE_URL }/users/validate-email/${ token }`;
        const html = `
          <h1>Validate your email</h1>
          <p>Click on the following link to validate your email</p>
          <a href="${ link }">Validate your email: ${ email }</a>
        `;
    
        const options: SendMailDto = {
          to: email,
          subject: 'Validate your email',
          html: html,
        }
    
        const isSent = await this._emailService.sendMail(options);
        if ( !isSent ) throw CustomError.internal('Error sending email');
    
        return true;
      }


    async validateEmail(token: string): Promise<void> {
        const payload = await jwtAdapter.verifyToken(token);
        if (!payload) throw CustomError.unauthorized('Invalid token');

        const { email } = payload as { email: string };
        if (!email) throw CustomError.internal('Email not in token');

        const user = await this._userRepository.findUserByEmail(email);
        if (!user) throw CustomError.internal('Email not exists');


        await this._userRepository.changeStatus(user.id, true);

    }
}