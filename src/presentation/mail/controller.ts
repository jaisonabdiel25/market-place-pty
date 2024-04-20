import { Request, Response } from "express"

export class MailController {

    constructor(

    ) { }

    sendMail = async (req: Request, res: Response) => {
        return res.status(200).json({ message: 'Mail sent' })
    }

}