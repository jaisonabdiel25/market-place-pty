import { Sale } from "@prisma/client";
import { ISalesRepository } from "../interface/ISalesRepository";
import { prisma } from "../../../client";
import { CustomError } from "../../../config/errors";
import { IncomingHttpHeaders } from "http";
import { jwtAdapter } from "../../../config/jwt";
import { GlobalData, TokenDecoded } from "../../../domain/models/global";
import { SaleCreate } from "../../../domain/models/sales";


export class SalesRepository implements ISalesRepository {

    async getSales(): Promise<Sale[]> {

        try {
            return await prisma.sale.findMany({ include: { user: true } });
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async createSales(data: SaleCreate[], headers: IncomingHttpHeaders): Promise<void> {

        try {
            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);
            // const sales = data.map(d => ({ productId: d.productId, userId: decodedToken!.data.id, total: d.total}));

            // await prisma.sale.createMany({ data: sales });

        } catch (error) {
            throw CustomError.internal();
        }
    }

    async salesByUser(userId: string): Promise<[Sale[], number]> {
        try {

            const totalItems = await prisma.sale.count({ where: { userId } });

            const result = await prisma.sale.findMany({ where: { userId }, include: { user: true } });

            return [result, totalItems];
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async getSaleById(id: string): Promise<Sale | null> {

        try {

            return await prisma.sale.findFirst({ where: { id }, include: { user: true, SaleItem: { include: { product: { include: { images: true } } } } } });


        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    async updatePayment (orderId: string, transactionId: string): Promise<void>{
        
        try {

            await prisma.sale.update({ where: { id: orderId }, data: { transactionId, isPaid: true, paidAt: new Date() } });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }


}