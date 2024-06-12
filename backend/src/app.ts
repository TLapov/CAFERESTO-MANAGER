import express from 'express';
import { AppController } from './controllers/app.controller';

export type ExpressApp = express.Application;

export default class App {
    app: ExpressApp;

    constructor() {
        this.app = express();
        this.initRoutes();
    }

    private initRoutes() {
        const routes = new AppController(this.app);
        return routes;
    }


    listen(port: number, host: string, cb: () => void ): void {
        this.app.listen(port, host, cb);
    }

}
