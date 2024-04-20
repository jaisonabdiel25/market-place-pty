import { createTransport, SentMessageInfo } from 'nodemailer'
import { envs } from './envs'
import { SendMailDto } from '../domain/dtos/sendMail.dto'

export class MailConfigService {
    private transporter = createTransport({
        service: 'gmail',
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    })

    async sendEmail(option: SendMailDto): Promise<SentMessageInfo> {
        const { to, subject, html } = option
        try {

            return await this.transporter.sendMail({
                to,
                subject,
                html
            })

        } catch (error) {
            console.log('Error in sending email', error)
            return false
        }
    }
}