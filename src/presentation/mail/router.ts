import { Router } from "express";
import { MailController } from "./controller";

export class MailRoutes {

    static get routes(): Router {
        const router = Router();
        const controller = new MailController();

        // definir las rutas
        router.post('/send', controller.sendMail);

        return router;
    }
}