import { Sale } from "@prisma/client";
import { IncomingHttpHeaders } from "http";
import { SaleCreate } from "../../../domain/models/sales";


export abstract class ISalesRepository {
    abstract getSales(): Promise<Sale[]>;
    abstract createSales(data: SaleCreate[], headers: IncomingHttpHeaders): Promise<void>
    abstract salesByUser(userId: string): Promise<[Sale[], number]>
    abstract getSaleById(id: string): Promise<Sale | null>
    abstract updatePayment(orderId: string, transactionId: string): Promise<void>
}