import { Router } from "express";
import { categoryRoutes } from "./category.routes";
import { productRoutes } from "./product.routes";

class InitialRoutes {
    router: Router = Router();

    constructor() {
        this.router.use(categoryRoutes);
        this.router.use(productRoutes);
    }
}

export const appRoutes = new InitialRoutes().router;