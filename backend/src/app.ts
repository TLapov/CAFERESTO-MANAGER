import express from 'express';
import { AppController } from './controllers/app.controller';
import errorMiddleware from './middlewares/error.middleware';

export type ExpressApp = express.Application;

export default class App {
    app: ExpressApp;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.initRoutes();
        this.initError();
    }

    private initRoutes() {
        const routes = new AppController(this.app);
        return routes;
    }

    private initError(): void {
        this.app.use(errorMiddleware);
    }

    public listen(port: number, host: string, cb: () => void ): void {
        this.app.listen(port, host, cb);
    }

}
