import { IncomingHttpHeaders } from "http";
import { PaymentSale, SaleCreate } from "../../../domain/models/sales";
import { Sale } from "@prisma/client";
import { GlobalData } from "../../../domain/models/global";



export abstract class ISalesService {
    abstract createSale(data: SaleCreate, headers: IncomingHttpHeaders): Promise<void>;
    abstract getSalesByUser(headers: IncomingHttpHeaders): Promise<GlobalData<Sale[]>>;
    abstract getSaleById(id: string): Promise<Sale>;
    abstract updatePayment(data: PaymentSale): Promise<void>;
}