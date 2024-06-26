import express from 'express';
import { AppController } from './controllers/app.controller';
import errorMiddleware from './middlewares/error.middleware';
import { ExpressApp } from './helpers/types.helper';
import cors from 'cors';


export default class App {
    app: ExpressApp;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(cors());
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
