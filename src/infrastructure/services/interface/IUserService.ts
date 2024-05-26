import { User } from "@prisma/client";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { UserEntity } from "../../../domain/entity/UserEntity";
import { LoginUserDto } from "../../../domain/dtos/loginUser.dto";

export abstract class IUserService {
    abstract createUser(user: CreateUserDto): Promise<UserEntity>;
    abstract loginUser(user: LoginUserDto): Promise<UserEntity>;
}