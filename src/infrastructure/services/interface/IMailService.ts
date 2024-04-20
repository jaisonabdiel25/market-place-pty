import { SendMailDto } from "../../../domain/dtos/sendMail.dto";
import { SentMessageInfo } from 'nodemailer'



export abstract class IMailService {
    abstract sendMail(sendMailDto: SendMailDto): Promise<SentMessageInfo>;
}