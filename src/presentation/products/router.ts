import { Router } from 'express';
import { ProductController } from './controller';
import { ProductService } from '../../infrastructure/services/implementation/ProductService';
import { ImageRepository, ProductRepository } from '../../infrastructure/repositories';
import { TokenMiddelware } from '../../domain/middelwares/tokenMiddelwares';
import { uploadMultiple } from '../../domain/middelwares/multer';

export class ProductRoutes {


    static get routes(): Router {
        const router = Router();

        const productRepository = new ProductRepository();
        const imageRepository = new ImageRepository();
        const productService = new ProductService(productRepository, imageRepository);
        const controller = new ProductController(productService);

        // definir las rutas
        router.get('/', controller.getProducts);
        router.get('/:id', controller.getProduct);
        router.post('/', [TokenMiddelware.verifyToken, uploadMultiple], controller.createProduct);
        router.patch('/:id', TokenMiddelware.verifyToken, controller.updateProduct);

        return router;
    }

}