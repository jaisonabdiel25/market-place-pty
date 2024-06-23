import express, { Router } from 'express';
import cors from 'cors';

interface Props {
    port: number
    router: Router
}
export class Server {
    private readonly app = express()
    private readonly port: number
    private readonly router: Router

    constructor({ port, router }: Props) {
        this.port = port
        this.router = router
        this.app.use(cors()); 
    }

    public start() {
        
        this.app.use(express.json({ limit: '50mb'}));
        this.app.use(express.urlencoded({ extended: true, limit: '50mb'}));
        this.app.use(this.router);
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        })
    }
}
