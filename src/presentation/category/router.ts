import { Router } from "express";
import { CategoryController } from "./controller";
import { CategoryService } from "../../infrastructure/services";
import { CategoryRepository } from "../../infrastructure/repositories";

export class CategoryRoutes {

    static get routes(): Router {
        const router = Router();

        const categoryRepository = new CategoryRepository();
        const categoryService = new CategoryService(categoryRepository);
        const controller = new CategoryController(categoryService);

        // definir las rutas
        router.get('/', controller.getCategories);

        return router;
    }
}