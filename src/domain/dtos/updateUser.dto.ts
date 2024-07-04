


import { ZodError } from "zod";
import { CustomError } from "../../config/errors";
import { updateUserSchema } from "../schema/createUser.schema";


export class UpdateUserDto {
    private constructor(
        public name: string,
        public firstName: string,
        public password: string,
        public active: boolean,
        public phone?: string,
        public img?: string,
        public description?: string,
    ) { }

    static RegisterUser(object: { [key: string]: any }): [string[], UpdateUserDto?] {
        const { name, firstName, password, img, phone, description } = object
        try {
            updateUserSchema.parse({ name, firstName, password, phone, img, description });
            return [
                [],
                new UpdateUserDto(name, firstName, password, img, phone, img, description)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}