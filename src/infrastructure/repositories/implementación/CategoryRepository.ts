import { Category } from "@prisma/client";
import { prisma } from "../../../client";

export class CategoryRepository implements CategoryRepository {
    async getCategories(): Promise<Category[]> {
        return await prisma.category.findMany();
    }
}