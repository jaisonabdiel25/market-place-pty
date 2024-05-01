import { Request, Response } from 'express';
import { IUserService } from '../../infrastructure/services';
import { CustomError } from '../../config/errors';
import { PreconditionValidation } from '../../config/PreconditionValidation';

export class UsersController {


    constructor(
        private readonly _userService: IUserService
    ) { }

    createUser = async (req: Request, res: Response) => {

        try {
            const result = await this._userService.createUser(req.body);
            res.json({ data: result });
        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

}