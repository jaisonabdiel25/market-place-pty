import { User } from "@prisma/client";
import { prisma } from "../../../client";
import { IUserRepository } from "../interface/IUserRepository";
import { CreateUserDto } from "../../../domain/dtos/createUser.dto";
import { CustomError } from "../../../config/errors";
import { UpdateUserDto } from "../../../domain/dtos/updateUser.dto";


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

    async getUserById(id: string): Promise<User | null> {
        try {
            return await prisma.user.findUnique({ where: { id } })
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async updateUser(id: string, user: UpdateUserDto): Promise<User> {
        try {
            return await prisma.user.update({ where: { id }, data: { ...user } })
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async changeStatus(id: string, status: boolean): Promise<User> {
        try {
            return await prisma.user.update({ where: { id }, data: { active: status } })
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }
}