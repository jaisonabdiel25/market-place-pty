import { User } from "@prisma/client";
import { prisma } from "../../../client";
import { IUserRepository } from "../interface/IUserRepository";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { CustomError } from "../../../config/errors";


export class UserRepository implements IUserRepository {
    constructor() { }

    async findUserByEmail(email: string): Promise<User | null> {
        return await prisma.user.findUnique({ where: { email } })
    }

    async createUser(user: CreateUserDto): Promise<User> {
        try {
            return await prisma.user.create({ data: { ...user } })
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }
}