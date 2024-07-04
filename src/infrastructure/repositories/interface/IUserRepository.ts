import { User } from "@prisma/client";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { UpdateUserDto } from "../../../domain/dtos/updateUser.dto";


export abstract class IUserRepository {

    abstract findUserByEmail(email: string): Promise<User | null>;

    abstract createUser(user: CreateUserDto): Promise<User>;

    abstract getUserById(id: string): Promise<User | null>;

    abstract updateUser(id: string, user: UpdateUserDto): Promise<User>;

    abstract changeStatus(id: string, status: boolean): Promise<User>;
}