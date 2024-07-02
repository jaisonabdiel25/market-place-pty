import { IncomingHttpHeaders } from "http";
import { IProductRepository, ISalesRepository } from "../../repositories";
import { ISalesService } from "../interface/ISalesService";
import { CustomError } from "../../../config/errors";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { prisma } from "../../../client";
import { PaymentSale, SaleCreate } from "../../../domain/models/sales";
import { jwtAdapter } from "../../../config/jwt";
import { GlobalData, TokenDecoded } from "../../../domain/models/global";
import { Sale } from "@prisma/client";


export class SalesService implements ISalesService {
    constructor(
        private readonly _salesRepository: ISalesRepository,
        private readonly _productRepository: IProductRepository,
    ) { }

    async createSale(data: SaleCreate, headers: IncomingHttpHeaders): Promise<void> {

        try {

            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

            const products = await this._productRepository.getProductByListIds(data.productsId.map(d => d));

            if (products.length !== data.productsId.length) throw CustomError.prevalidation('Algunos productos no existen');

            await prisma.$transaction(async (tx) => {

                const updateProductPromises = products.map(product => {

                    return tx.product.update({
                        where: { id: product.id },
                        data: {
                            active: false,
                        }
                    });
                });

                const updateProduct = await Promise.all(updateProductPromises);


                const sale = await tx.sale.create({
                    data: {
                        total: data.total,
                        userId: decodedToken!.data.id,
                        subtotal: data.subtotal,
                        tax: data.tax,
                        totalItems: products.length,
                        SaleItem: {
                            createMany: {
                                data: products.map(p => ({
                                    productId: p.id,
                                    price: p.price,
                                }))
                            }
                        }

                    }
                });

                return { updateProduct, sale };
            });

        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    async getSalesByUser(headers: IncomingHttpHeaders): Promise<GlobalData<Sale[]>> {
        try {
            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

           const [result, totalItems] =  await this._salesRepository.salesByUser(decodedToken!.data.id);

           return { data: result, totalItems };

        } catch (error) {
            throw CustomError.internal();
        }
    }

    async getSaleById(id: string): Promise<Sale> {
        try {
            const result = await this._salesRepository.getSaleById(id);

            if (!result) throw CustomError.notFound('Venta no encontrada');

            return result;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            if (error instanceof PreconditionValidation) throw error;
            throw CustomError.internal();
        }
    }

    async updatePayment(request: PaymentSale): Promise<void> {
        try {

            await this._salesRepository.updatePayment(request.orderId, request.transactionId);
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }
}