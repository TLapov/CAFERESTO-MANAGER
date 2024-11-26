import { Router } from "express";
import { productController } from "../controllers/product.controller";

export default class ProductRoutes {
    PATH: string = `/product`;
    router: Router = Router();
    
    constructor() {
        this.router.get(this.PATH, productController.getAll);
        this.router.post(this.PATH, productController.create);
        this.router.patch(this.PATH, productController.update);
        this.router.delete(`${this.PATH}/:id`, productController.delete);
    }
}

export const productRoutes = new ProductRoutes().router;