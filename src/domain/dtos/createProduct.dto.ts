import { ZodError } from "zod";
import { CustomError } from "../../config/errors";
import { CreateProducts } from "../models/products";
import { createProductSchema } from "../schema/product.schema";

export class CreateProductDto {
    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public categoryId: string,
        public img?: string
    ) { }

    static CreateProduct(object: CreateProducts): [string[], CreateProductDto?] {
        const { name, description, price, categoryId, img } = object
        try {
            createProductSchema.parse({ name, description, price, categoryId, img });
            return [
                [],
                new CreateProductDto(name, description, price, categoryId, img)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}