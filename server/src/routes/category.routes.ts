import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

export default class CategoryRoutes {
    PATH: string = `/category`;
    router: Router = Router();
    
    constructor() {
        this.router.get(this.PATH, categoryController.getAll);
    }
}

export const categoryRoutes = new CategoryRoutes().router;