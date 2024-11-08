import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

export default class CategoryRoutes {
    PATH: string = `/category`;
    router: Router = Router();
    
    constructor() {
        this.router.get(this.PATH, categoryController.getCategories);
        this.router.post(this.PATH, categoryController.createCategory);
        this.router.patch(this.PATH, categoryController.updateCategory);
        this.router.delete(`${this.PATH}/:id`, categoryController.deleteCategory);
    }
}

export const categoryRoutes = new CategoryRoutes().router;