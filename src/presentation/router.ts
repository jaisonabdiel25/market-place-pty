import { Router } from 'express';
import { MailRoutes } from './mail/router';
import { UserRoutes } from './users/router';
import { ProductRoutes } from './products/router';
import { CategoryRoutes } from './category/router';
import { SalesRouter } from './sales/router';
import { SalesItemRouter } from './saleItems/router';

export class AppRouter {

    static get routes(): Router {
        const router = Router();

        router.use('/api/mail', MailRoutes.routes);
        router.use('/api/users', UserRoutes.routes);
        router.use('/api/products', ProductRoutes.routes);
        router.use('/api/categories', CategoryRoutes.routes);
        router.use('/api/sales', SalesRouter.routes)
        router.use('/api/salesitem', SalesItemRouter.routes)

        return router;
    }
}