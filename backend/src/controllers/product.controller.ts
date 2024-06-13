import { NextFunction, Router, Response, Request } from "express";
import { BASE_PATH, HttpStatusCode } from "../helpers/constant.helper";
import { AppResponse } from '../utils/response.util';
import { CategoryService } from "../services/category.servise";

export class ProductController  {
    router: Router = Router();
    categoryService = new CategoryService();
    
    constructor() {
        this.router.get(BASE_PATH, this.getProducts);
        this.router.post(BASE_PATH,this.createProduct);
        this.router.put(BASE_PATH, this.updateProduct);
        this.router.delete(`${BASE_PATH}:id`, this.deleteProduct);
    }

    getProducts = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const categories = await this.categoryService.getCategories();
            
            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Uspješan dohvat kategorije', categories);

        } catch (error) {
            next(error);
        }
    }

    createProduct = async(req: Request, res: Response, next: NextFunction) => {
        
    }

    updateProduct = async(req: Request, res: Response, next: NextFunction) => {
        
        
    }

    deleteProduct = async(req: Request, res: Response, next: NextFunction) => {
        
    }

}