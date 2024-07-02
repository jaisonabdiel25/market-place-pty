
import { SaleItem } from '@prisma/client';
import { ISalesItemService } from '../interface/ISalesItemService';
import { ISalesItemRepository } from '../../repositories';
import { PreconditionValidation } from '../../../config/PreconditionValidation';
import { CustomError } from '../../../config/errors';


export class SalesItemService implements ISalesItemService {
    constructor(
        private readonly _salesItemRepository: ISalesItemRepository
    ) 
    {}
    async getSalesItemBySaleId(id: string): Promise<SaleItem[]> {

        try {

            if (!id) throw CustomError.prevalidation('El id de la venta es requerido');

            return await this._salesItemRepository.getSalesItemBySaleId(id);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }
}