import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { LoginUserDto } from "../../../domain/dtos/loginUser.dto";
import { IncomingHttpHeaders } from "http";

export abstract class IUserService {
    abstract createUser(user: CreateUserDto): Promise<UserEntity>;
    abstract loginUser(user: LoginUserDto): Promise<UserEntity>;
    abstract getUserById(headers: IncomingHttpHeaders): Promise<UserEntity>;
    abstract updateUser(user: CreateUserDto, files: Express.Multer.File[], headers: IncomingHttpHeaders): Promise<UserEntity>;
    abstract validateEmail(token: string): Promise<void>;
}