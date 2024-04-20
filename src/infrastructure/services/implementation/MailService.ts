import { SentMessageInfo } from "nodemailer";
import { IMailService } from "../interface/IMailService";
import { SendMailDto } from "../../../domain/dtos/sendMail.dto";
import { MailConfigService } from "../../../config/mail";


export class MailService implements IMailService {

    constructor(
    ) { }

    async sendMail(sendMailDto: SendMailDto): Promise<SentMessageInfo> {
        try {
            // Here we will implement the logic to send the mail
            const mailConfig = new MailConfigService()
            return await mailConfig.sendEmail(sendMailDto);

        } catch (error) {
            throw new Error('Error sending mail')
        }
    }
}