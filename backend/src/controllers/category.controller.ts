import { NextFunction, Router, Response, Request } from "express";
import { BASE_PATH, HttpStatusCode } from "../helpers/constant.helper";
import { CategoryService } from "../services/category.servise";
import { AppResponse } from "../utils/response.util";
import { AppError } from "../utils/error.util";

export class CategoryController  {
    router: Router = Router();
    categoryService = new CategoryService();

    constructor() {
        this.router.get(BASE_PATH, this.getCategories);
        this.router.post(BASE_PATH,this.createCategory);
        this.router.put(BASE_PATH, this.updateCategory);
        this.router.delete(`${BASE_PATH}:id`, this.deleteCategory);
    }

    getCategories = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.getCategories();
            
            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Uspješan dohvat kategorije', categories);

        } catch (error) {
            next(error);
        }
    }

    createCategory = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            await this.categoryService.createCategory(body);

            AppResponse.createApiResponse(res, HttpStatusCode.CREATED, 'Kategorija je uspješno kreireana');
            
        }catch (err: any) {
            next(err);
        }
    }

    updateCategory = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            await this.categoryService.updateCategory(body);

            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Kategorija je uspješno promijenjena');
            
        }catch (error) {
            next(error);
        }
        
    }

    deleteCategory = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            await this.categoryService.deleteCategory(id);

            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Kategorija je uspješno izbrisana');

        }catch(err){
            next(err);
        }
        
    }

}

