

export interface SaleCreate {
    total: number;
    subtotal: number;
    tax: number;
    productsId: string[];
}

export interface PaymentSale {
    orderId: string;
    transactionId: string;
}