import { Request, Response } from 'express';





export class UsersController {


    constructor() { }

    createUser = async (req: Request, res: Response) => {

        res.json({ message: 'User created' });
    }

}