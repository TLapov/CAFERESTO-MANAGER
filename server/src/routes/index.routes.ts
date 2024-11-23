import { Router } from "express";
import { categoryRoutes } from "./category.routes";

class InitialRoutes {
    router: Router = Router();

    constructor() {
        this.router.use(categoryRoutes);
    }
}

export const appRoutes = new InitialRoutes().router;