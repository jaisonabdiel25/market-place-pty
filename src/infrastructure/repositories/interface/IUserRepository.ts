import { User } from "@prisma/client";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";


export abstract class IUserRepository {

    abstract findUserByEmail(email: string): Promise<User | null>;

    abstract createUser(user: CreateUserDto): Promise<User>;
}