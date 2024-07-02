import { SaleItem } from "@prisma/client";


export abstract class ISalesItemService {
    abstract getSalesItemBySaleId(id: string): Promise<SaleItem[]>;
}