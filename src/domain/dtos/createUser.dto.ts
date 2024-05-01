import { ZodError } from "zod";
import { CustomError } from "../../config/errors";
import { createUserSchema } from "../schema/createUser.schema";


export class CreateUserDto {
    private constructor(
        public name: string,
        public firstName: string,
        public email: string,
        public password: string,
        public active: boolean,
        public phone?: string,
        public img?: string
    ) { }

    static RegisterUser(object: { [key: string]: any }): [string[], CreateUserDto?] {
        const { name, firstName, email, password, img, phone, confirmPassword } = object
        try {
            createUserSchema.parse({ name, firstName, email, password, phone, confirmPassword });
            return [
                [],
                new CreateUserDto(name, firstName, email, password, img, phone)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}