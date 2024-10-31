import { Router } from "express";
import { categoryController } from "./category.controller";

class InitialController {
    router: Router = Router();

    constructor() {
        this.router.use(categoryController);
    }
}

export const initalController = new InitialController().router;