import { NextFunction, Router, Response, Request } from "express";
import { BASE_PATH } from "../helpers/constant.helper";

export class CategoryController  {
    router: Router = Router();

    constructor() {
        this.router.get(BASE_PATH, this.getCategories);
        this.router.post(BASE_PATH,this.createCategory);
        this.router.put(BASE_PATH, this.updateCategory);
        this.router.delete(`${BASE_PATH}:id`, this.deleteCategory);
    }

    getCategories = async(req: Request, res: Response, next: NextFunction) => {
      
    }

    createCategory = async(req: Request, res: Response, next: NextFunction) => {
        
    }

    updateCategory = async(req: Request, res: Response, next: NextFunction) => {
        
        
    }

    deleteCategory = async(req: Request, res: Response, next: NextFunction) => {
        
    }

}

