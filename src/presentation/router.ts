import { Router } from 'express';
import { MailRoutes } from './mail/router';

export class AppRouter {

    static get routes(): Router {
        const router = Router();

        router.use('/api/mail', MailRoutes.routes);
        return router;
    }
}