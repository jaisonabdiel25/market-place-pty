import { SaleItem } from '@prisma/client';


export abstract class ISalesItemRepository {
    abstract getSalesItemBySaleId(id: string): Promise<SaleItem[]>;
}