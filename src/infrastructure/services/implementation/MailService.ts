import { SentMessageInfo } from "nodemailer";
import { IMailService } from "../interface/IMailService";
import { SendMailDto } from "../../../domain/dtos/sendMail.dto";
import { MailConfigService } from "../../../config/mail";
import { CustomError } from "../../../config/errors";


export class MailService implements IMailService {

    constructor(
    ) { }

    async sendMail(sendMailDto: SendMailDto): Promise<SentMessageInfo> {
        try {

            const [error, registerUserDto] = SendMailDto.sendMail(sendMailDto);

            if (error.length > 0) throw CustomError.prevalidation(error[0]);
            
            const mailConfig = new MailConfigService()
            return await mailConfig.sendEmail(registerUserDto!);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw new Error('Error sending mail')
        }
    }
}