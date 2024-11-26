import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

export default class CategoryRoutes {
    PATH: string = `/category`;
    router: Router = Router();
    
    constructor() {
        this.router.get(this.PATH, categoryController.getAll);
        this.router.post(this.PATH, categoryController.create);
        this.router.patch(this.PATH, categoryController.update);
        this.router.delete(`${this.PATH}/:id`, categoryController.delete);
    }
}

export const categoryRoutes = new CategoryRoutes().router;