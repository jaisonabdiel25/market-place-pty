import { Category } from "@prisma/client";

export abstract class ICategoryService {
    abstract getCategories(): Promise<Category[]>;
}