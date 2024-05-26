import { ZodError } from "zod";
import { CustomError } from "../../config/errors";
import { loginUserSchema } from "../schema/loginUser.schema";


export class LoginUserDto {
    private constructor(
        public email: string,
        public password: string,
    ) { }

    static LoginUser(object: { [key: string]: any }): [string[], LoginUserDto?] {
        const { email, password } = object
        try {
            loginUserSchema.parse({ email, password });
            return [
                [],
                new LoginUserDto(email, password)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}