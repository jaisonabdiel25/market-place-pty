import { IncomingHttpHeaders } from "http";
import { IProductRepository, ISalesItemRepository, ISalesRepository } from "../../repositories";
import { ISalesService } from "../interface/ISalesService";
import { CustomError } from "../../../config/errors";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { prisma } from "../../../client";
import { PaymentSale, SaleCreate } from "../../../domain/models/sales";
import { jwtAdapter } from "../../../config/jwt";
import { GlobalData, TokenDecoded } from "../../../domain/models/global";
import { Sale, } from "@prisma/client";
import { SendMailDto } from "../../../domain/dtos/sendMail.dto";
import { IMailService } from "../interface/IMailService";


export class SalesService implements ISalesService {
    constructor(
        private readonly _salesRepository: ISalesRepository,
        private readonly _productRepository: IProductRepository,
        private readonly _emailService: IMailService,
        private readonly _salesItemRepository: ISalesItemRepository
    ) { }

    async createSale(data: SaleCreate, headers: IncomingHttpHeaders): Promise<void> {

        try {

            const decodedToken = await jwtAdapter.decodeToken<GlobalData<TokenDecoded>>(headers);

            const products = await this._productRepository.getProductByListIds(data.productsId.map(d => d));

            if (products.length !== data.productsId.length) throw CustomError.prevalidation('Algunos productos no existen');

            const { updateProduct } = await prisma.$transaction(async (tx) => {

                const updateProductPromises = products.map(product => {

                    return tx.product.update({
                        where: { id: product.id },
                        data: {
                            active: false,
                        },
                        include: { createBy: true }
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

                const emailsDistincs = [...new Set(updateProduct.map(p => p.createBy.email))];

                emailsDistincs.forEach(element => {
                    this.sendEmailOrderCreated(element, updateProduct.filter(p => p.createBy.email === element).map(p => `${p.name} - con un valor de  $${p.price}`));
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

            const [result, totalItems] = await this._salesRepository.salesByUser(decodedToken!.data.id);

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

            const saleItems = await prisma.saleItem.findMany({
                where: {
                    saleId: request.orderId
                },
                include: { product: { include: { createBy: true } }, sale: {include: {user: true}}, }
            });

            const emailsDistincs = [...new Set(saleItems.map(p => p.product.createBy.email))];

            emailsDistincs.forEach(element => {
                this.sendEmailConfirmPayment(element, saleItems.filter(p => p.product.createBy.email === element).map(p => `${p.product.name} con un valor de $${p.price}`));
            });

            this.sendEmailPaymentSuccess(saleItems[0].sale.user.email, saleItems[0].sale.total);

        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw CustomError.internal();
        }
    }

    private sendEmailOrderCreated = async (email: string, products: string[]) => {

        const token = await jwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internal('Error getting token');

        const html = `
          <h3>Se ha(n) agregado a una orden de compra tu(s) producto(s)</h3>

          <p>los productos son:</p>
          <ul>
          ${products.map(p => (
            `<li>${p}</li>`
        ))}
        </ul>
          <p>Te estaremos contactando cuando se realice el pago de la orden.</p>
        `;

        const options: SendMailDto = {
            to: email,
            subject: 'Orden creada para tus productos',
            html: html,
        }

        const isSent = await this._emailService.sendMail(options);
        if (!isSent) throw CustomError.internal('Error sending email');

        return true;
    }

    private sendEmailConfirmPayment = async (email: string, products: string[]) => {

        const token = await jwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internal('Error getting token');

        const html = `
          <h3>Se ha realizado el pago de el/los productos</h3>

          <p>los productos son:</p>
          <ul>
          ${products.map(p => (
            `<li>${p}</li>`
        ))}
        </ul>
          <p>Te estaremos contactando para realizar el desembolso del pago de tu(s) productos.</p>
        `;

        const options: SendMailDto = {
            to: email,
            subject: 'Pago realizado de tus productos',
            html: html,
        }

        const isSent = await this._emailService.sendMail(options);
        if (!isSent) throw CustomError.internal('Error sending email');

        return true;
    }

    private sendEmailPaymentSuccess = async (email: string, total: number) => {

        const token = await jwtAdapter.generateToken({ email });
        if (!token) throw CustomError.internal('Error getting token');

        const html = `
          <h3>Su compra en marketplace-pty ser ha realizado con exito</h3>

          <p>Muchas gracias.</p>
        `;

        const options: SendMailDto = {
            to: email,
            subject: 'Pago realizado de tus productos',
            html: html,
        }

        const isSent = await this._emailService.sendMail(options);
        if (!isSent) throw CustomError.internal('Error sending email');

        return true;
    }
}