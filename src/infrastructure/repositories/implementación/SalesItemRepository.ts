import { SaleItem } from "@prisma/client";
import { prisma } from "../../../client";
import { ISalesItemRepository } from "../interface/ISalesItemRepository";


export class SalesItemRepository extends ISalesItemRepository {

    async getSalesItemBySaleId(id: string): Promise<SaleItem[]> {
        return await prisma.saleItem.findMany({
            where: {
                saleId: id
            },
            include: { product: { include: { createBy: true } }, sale: true,  }
        });
    }
}