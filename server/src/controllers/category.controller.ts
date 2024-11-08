import { NextFunction, Request, Response, Router } from "express";
import { categoryModel } from "../models/category.model";
import { AppResponse } from "../services/response.service";

export class CategoryController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await categoryModel.findAll();
            new AppResponse(res, 200, 'Get category success', categories);
        } catch(error: unknown) {
            next(error)
        }
    }
   
}

export const categoryController = new CategoryController();