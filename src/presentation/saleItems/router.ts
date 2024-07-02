import { Router } from "express";

import { SalesItemService } from "../../infrastructure/services";
import { SalesItemRepository, } from "../../infrastructure/repositories";
import { TokenMiddelware } from "../../domain/middelwares/tokenMiddelwares";
import { SalesItemController } from "./controller";


export class SalesItemRouter {


    static get routes(): Router {
        const router = Router();

        const salesItemRepository = new SalesItemRepository();
        const salesItemService = new SalesItemService(salesItemRepository);
        const controller = new SalesItemController(salesItemService);

        // definir las rutas
        router.get('/:id', TokenMiddelware.verifyToken, controller.getSalesItemsBySale);

        return router;
    }
}