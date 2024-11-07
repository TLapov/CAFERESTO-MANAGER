import { NextFunction, Request, Response, Router } from "express";
import { CategoryModel } from "../models/category.model";
import { AppResponse } from "../services/response.service";

export class CategoryController {
    path:string = '/category';
    router: Router = Router();
    categoryModel = new CategoryModel();
    
    constructor(){
        this.router.get(this.path, this.getAll);
    }

    getAll = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryModel.getCategories();
            new AppResponse(res, 200, 'Get category success', categories);
        } catch(error: unknown) {
            next(error)
        }
    }
   
}

export const categoryController = new CategoryController().router;