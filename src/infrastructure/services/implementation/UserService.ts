import { IUserService } from "../interface/IUserService";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { CustomError } from "../../../config/errors";
import { IUserRepository } from "../../repositories";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { UserMapperResponse } from "../../../domain/mappers/UserMapperResponse";
import { BcryptAdapter } from "../../../config/bcrypt";
import { LoginUserDto } from "../../../domain/dtos/loginUser.dto";

export class UserService implements IUserService {
    constructor(
        private readonly _userRepository: IUserRepository
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
}