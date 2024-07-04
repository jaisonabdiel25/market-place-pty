import { Router } from 'express';
import { UsersController } from './controller';
import { MailService, UserService } from '../../infrastructure/services';
import { UserRepository } from '../../infrastructure/repositories';
import { TokenMiddelware } from '../../domain/middelwares/tokenMiddelwares';
import { uploadMultiple } from '../../domain/middelwares/multer';


export class UserRoutes {


    static get routes(): Router {
        const router = Router();

        const userRepository = new UserRepository();
        const mailService = new MailService();
        const userService = new UserService(userRepository, mailService);
        const controller = new UsersController(userService);

        // definir las rutas
        router.post('/', controller.createUser);
        router.post('/login', controller.loginUser);
        router.get('/', TokenMiddelware.verifyToken, controller.getUser);
        router.patch('/', [TokenMiddelware.verifyToken, uploadMultiple], controller.updateUser);
        router.get('/validate-email/:token', controller.validateEmail );

        return router;
    }

}