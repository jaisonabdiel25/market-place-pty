import { Router } from 'express';
import { MailRoutes } from './mail/router';
import { UserRoutes } from './users/router';
import { ProductRoutes } from './products/router';

export class AppRouter {

    static get routes(): Router {
        const router = Router();

        router.use('/api/mail', MailRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        return router;
    }
}