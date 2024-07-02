import { Product } from "@prisma/client";
import { CreateProducts } from "../../../domain/models/products";
import { IncomingHttpHeaders } from 'http';
import { GlobalData } from "../../../domain/models/global";

export abstract class IProductService {
    abstract getProducts(page: number, size: number): Promise<GlobalData<Product[]>>;
    abstract getProduct(id: string): Promise<Product | null>;
    abstract createProduct(products: CreateProducts, files: Express.Multer.File[], headers: IncomingHttpHeaders): Promise<Product>;
    abstract updateProduct(id: string, products: CreateProducts, headers: IncomingHttpHeaders): Promise<void>;
}