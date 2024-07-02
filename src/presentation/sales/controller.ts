import { Request, Response } from 'express';
import { PreconditionValidation } from '../../config/PreconditionValidation';
import { CustomError } from '../../config/errors';
import { ISalesService } from '../../infrastructure/services';

export class SalesController {
    constructor(private readonly salesService: ISalesService) { }

    createSale = async (req: Request, res: Response) => {
        try {

            await this.salesService.createSale(req.body, req.headers);

            res.status(201).json({ message: 'Sale created' });

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    getSalesByUser = async (req: Request, res: Response) => {
        try {

            const sales = await this.salesService.getSalesByUser(req.headers);

            res.status(200).json(sales);

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    getSaleById = async (req: Request, res: Response) => {
        try {

            const sales = await this.salesService.getSaleById(req.params.id);

            res.status(200).json(sales);

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }

    updatePayment = async (req: Request, res: Response) => {
        try {

            await this.salesService.updatePayment(req.body);

            res.status(200).json({ message: 'Payment updated' });

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }
}