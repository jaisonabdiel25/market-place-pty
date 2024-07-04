import { Router } from "express";
import { SalesController } from "./controller";
import { MailService, SalesService } from "../../infrastructure/services";
import { ProductRepository, SalesItemRepository, SalesRepository } from "../../infrastructure/repositories";
import { TokenMiddelware } from "../../domain/middelwares/tokenMiddelwares";


export class SalesRouter {


    static get routes(): Router {
        const router = Router();

        const salesItemRepository = new SalesItemRepository();
        const mailService = new MailService();
        const saleRepository = new SalesRepository();
        const productRepository = new ProductRepository();
        const salesService = new SalesService(saleRepository, productRepository, mailService, salesItemRepository);
        const controller = new SalesController(salesService);

        // definir las rutas
        router.post('/', TokenMiddelware.verifyToken, controller.createSale);
        router.get('/user', TokenMiddelware.verifyToken, controller.getSalesByUser);
        router.get('/:id', TokenMiddelware.verifyToken, controller.getSaleById);
        router.post('/payments', TokenMiddelware.verifyToken, controller.updatePayment);

        return router;
    }
}