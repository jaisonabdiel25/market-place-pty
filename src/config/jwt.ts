import jwt from 'jsonwebtoken';
import { envs } from './envs';
import { IncomingHttpHeaders } from 'http';


const JWT_SEED = envs.JWT_SECRET;

export class jwtAdapter {

    static async generateToken(payload: object, duration = '2h'): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
                if (err) throw err;
                resolve(token!);
            });
        })
    }

    static async verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        })
    }

    static async decodeToken<T>(headers: IncomingHttpHeaders): Promise<T | null> {

        const { authorization } = headers;
        const token = authorization!.split(' ')[1];

        return new Promise((resolve) => {
            jwt.verify(token!, JWT_SEED, (err, decoded) => {
                if (err) return resolve(null);
                resolve(decoded as T);
            });
        })
    }
}
