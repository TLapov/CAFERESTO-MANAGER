import { NextFunction, Request, Response} from "express";
import { AppResponse } from "../services/response.service";
import { categoryService } from "../services/category.service";
import { HttpStatusCode } from "../config/constants.config";
import { ICategory } from "../models/category.model";

export class CategoryController {

    async getCategories(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryService.getCategories();
            AppResponse.successResponse(res, HttpStatusCode.SUCCESS, 'Get category success', categories);
        } catch(error: unknown) {
            next(error)
        }
    }

    async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            const category = await categoryService.createCategory(payload);
            AppResponse.successResponse(res, HttpStatusCode.CREATED, 'Create category success', category)
        } catch (error) {
            next(error);
        }
    }

    async updateCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            await categoryService.updateCategory(payload);
            AppResponse.successResponse(res, HttpStatusCode.SUCCESS, 'Update category success');
        } catch (error) {
            next(error);
        }
    }

    async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            await categoryService.deleteCategory(id);
            AppResponse.successResponse(res, HttpStatusCode.NO_CONTENT, 'Delete category success')
        } catch (error) {
            next(error);
        }
    }
}

export const categoryController = new CategoryController();