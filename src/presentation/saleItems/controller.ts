

import { Request, Response } from 'express';
import { PreconditionValidation } from '../../config/PreconditionValidation';
import { CustomError } from '../../config/errors';
import { ISalesItemService } from '../../infrastructure/services';

export class SalesItemController {
    constructor(private readonly salesService: ISalesItemService) { }

    getSalesItemsBySale = async (req: Request, res: Response) => {
        try {

            const sales = await this.salesService.getSalesItemBySaleId(req.params.id);

            res.status(200).json(sales);

        } catch (error) {
            if (error instanceof PreconditionValidation) {
                PreconditionValidation.handleErrors(error, res);
            }
            CustomError.handleErrors(error, res);
        }
    }
}