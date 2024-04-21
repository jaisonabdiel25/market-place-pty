import { Router } from 'express';
import { UsersController } from './controller';


export class UserRoutes {


    static get routes(): Router {
        const router = Router();

        
        const controller = new UsersController();

        // definir las rutas
        router.post('/', controller.createUser);

        return router;
    }

}