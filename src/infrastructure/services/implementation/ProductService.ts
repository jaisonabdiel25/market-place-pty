import { prisma } from "../../../client";
import { PreconditionValidation } from "../../../config/PreconditionValidation";
import { CreateProductDto } from "../../../domain/dtos/createProduct.dto";
import { CreateProducts } from "../../../domain/models/products";
import { IProductService } from "../interface/IProductService";

export class ProductService implements IProductService {

    constructor(

    ) { }

    async createProduct(products: CreateProducts): Promise<void> {


        try {
            const [error, productsDto] = CreateProductDto.CreateProduct(products);

            if (error.length > 0) throw PreconditionValidation.PreconditionsFailed(error);

            prisma.product.create({ data: { ...productsDto, createById: '', img: '', price: 22.1 } })

        } catch (error) {
            
        }
    }

    async getProducts(): Promise<void> {
        console.log('get products')
    }
}