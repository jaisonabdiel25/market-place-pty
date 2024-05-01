import { User } from "@prisma/client";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { UserEntity } from "../../../domain/entity/UserEntity";

export abstract class IUserService {
    abstract createUser(user: CreateUserDto): Promise<UserEntity>;
}