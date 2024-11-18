import { NextFunction, Request, Response} from "express";
import { AppResponse } from "../services/response.service";
import { categoryService } from "../services/category.service";
import { HttpStatusCode } from "../config/constants.config";

export class CategoryController {

    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.getCategories();
            new AppResponse(res, HttpStatusCode.SUCCESS, 'Get category success', categories);
        } catch(error: unknown) {
            next(error)
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            const category = await categoryService.createCategory(payload);
            new AppResponse(res, HttpStatusCode.CREATED, 'Create category success', category);    
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            await categoryService.updateCategory(payload);
            new AppResponse(res, HttpStatusCode.SUCCESS, 'Update category success');            
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            await categoryService.deleteCategory(id);
            new AppResponse(res, HttpStatusCode.NO_CONTENT, 'Delete category success');   
        } catch (error) {
            next(error);
        }
    }
}

export const categoryController = new CategoryController();