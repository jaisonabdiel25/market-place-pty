import { ZodError } from "zod";
import { sendMailSchema } from "../schema/sendMail.schema";

export class SendMailDto {
    constructor(
        public to: string,
        public subject: string,
        public html: string,
    ) { }

    static sendMail(object: { [key: string]: any }): [string[], SendMailDto?] {
        const { to, subject, html } = object
        try {

            sendMailSchema.parse({ to, subject, html });
            return [
                [],
                new SendMailDto(to, subject, html)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw error;
        }
    }
}