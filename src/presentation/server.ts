import express, { Router } from 'express';

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
    }

    public start() {
        this.app.use(express.json());
        this.app.use(this.router);
        this.app.listen(this.port, () => {
            console.log(`Server running at port ${this.port}`);
        })
    }
}
