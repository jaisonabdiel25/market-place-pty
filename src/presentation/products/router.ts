import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../../infrastructure/services/implementation/ProductService';
import { ProductRepository } from '../../infrastructure/repositories';
import { TokenMiddelware } from '../../domain/middelwares/tokenMiddelwares';

export class ProductRoutes {


    static get routes(): Router {
        const router = Router();

        const productRepository = new ProductRepository();
        const productService = new ProductService(productRepository);
        const controller = new ProductController(productService);

        // definir las rutas
        router.get('/', controller.getProducts);
        router.post('/', TokenMiddelware.verifyToken, controller.createProduct);

        return router;
    }

}