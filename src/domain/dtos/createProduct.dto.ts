import { ZodError } from "zod";
import { CustomError } from "../../config/errors";
import { CreateProducts } from "../models/products";
import { productSchema } from "../schema/createProduct.schema";


export class CreateProductDto {
    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public img?: string
    ) { }

    static CreateProduct(object: CreateProducts): [string[], CreateProductDto?] {
        const { name, description, price, img } = object
        try {
            productSchema.parse({ name, description, price, img });
            return [
                [],
                new CreateProductDto(name, description, price, img)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}