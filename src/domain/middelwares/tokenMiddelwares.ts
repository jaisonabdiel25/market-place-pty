import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config/jwt";



export class TokenMiddelware {

    static async verifyToken(req: Request, res: Response, next: NextFunction) {

        try {

            const token = req.headers.authorization?.split(" ")[1];
            if (!token) return res.status(401).send({ error: "No token provided" });

            const payload = await jwtAdapter.verifyToken<{ id: string }>(token);

            if (!payload) return res.status(401).send({ error: "Invalid token" });

            req.body.token = payload;

            next();

        } catch (error) {

            res.status(401).send({ error });
        }
    }
}