import { Category } from "@prisma/client";


export abstract class ICategoryRepository {
    abstract getCategories(): Promise<Category[]>
}