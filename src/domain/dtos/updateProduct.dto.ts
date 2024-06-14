import { ZodError } from "zod";
import { CustomError } from "../../config/errors";
import { CreateProducts } from "../models/products";
import { updateProductSchema } from "../schema/product.schema";


export class UpdateProductDto {
    private constructor(
        public name: string,
        public description: string,
        public price: number,
        public img?: string
    ) { }

    static UpdateProduct(object: CreateProducts): [string[], UpdateProductDto?] {
        const { name, description, price, img } = object
        try {
            updateProductSchema.parse({ name, description, price, img });
            return [
                [],
                new UpdateProductDto(name, description, price, img)
            ];
        } catch (error) {
            if (error instanceof ZodError) {
                return [error.errors.map(issues => issues.message), undefined]
            }
            throw CustomError.internal();
        }
    }
}