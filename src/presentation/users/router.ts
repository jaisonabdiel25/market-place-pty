import { Router } from 'express';
import { UsersController } from './controller';
import { UserService } from '../../infrastructure/services';
import { UserRepository } from '../../infrastructure/repositories';


export class UserRoutes {


    static get routes(): Router {
        const router = Router();

        const userRepository = new UserRepository()
        const userService = new UserService(userRepository);
        const controller = new UsersController(userService);

        // definir las rutas
        router.post('/', controller.createUser);

        return router;
    }

}