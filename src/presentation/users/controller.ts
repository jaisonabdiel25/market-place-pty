import { Request, Response } from 'express';
import { IUserService } from '../../infrastructure/services';
import { CustomError } from '../../config/errors';
import { PreconditionValidation } from '../../config/PreconditionValidation';
import { jwtAdapter } from '../../config/jwt';

export class UsersController {

    constructor(
        private readonly _userService: IUserService
    ) { }

    createUser = async (req: Request, res: Response) => {

        try {
            const result = await this._userService.createUser(req.body);
            res.status(200).json({ data: result, token: await jwtAdapter.generateToken({ data: result }) });
        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    loginUser = async (req: Request, res: Response) => {

        try {
            const result = await this._userService.loginUser(req.body);

            res.status(200).json({ data: result, token: await jwtAdapter.generateToken({ data: result }) });

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }
}