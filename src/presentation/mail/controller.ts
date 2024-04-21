import { Request, Response } from "express"
import { IMailService } from "../../infrastructure/services"
import { CustomError } from "../../config/errors";

export class MailController {

    constructor(
        private readonly _mailService: IMailService
    ) { }

    private handleErrors(error: unknown, res: Response) {
        if (error instanceof CustomError) return res.status(error.statusCode).send({ error: error.message });

        if (error instanceof Error) return res.status(500).send({ error: error.message });
    }

    sendMail = async (req: Request, res: Response) => {
        try {
            const result = await this._mailService.sendMail(req.body);

            res.json({ accepted: result.accepted, rejected: result.rejected })
        } catch (error) {
            this.handleErrors(error, res)
        }
    }

}