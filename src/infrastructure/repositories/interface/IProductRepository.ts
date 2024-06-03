import { Product } from "@prisma/client";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";


export abstract class IProductRepository {
    abstract getProducts(): Promise<Product[]>;
    abstract createProduct(product: CreateProductDto): Promise<Product>;
}