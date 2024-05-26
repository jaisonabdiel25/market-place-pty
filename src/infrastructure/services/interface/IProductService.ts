import { CreateProducts } from "../../../domain/models/products";

export abstract class IProductService {
    abstract createProduct(products: CreateProducts): Promise<void>;
    abstract getProducts(): Promise<void>;
}