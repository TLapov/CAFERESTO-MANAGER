import { NextFunction, Router, Response, Request } from "express";
import { BASE_PATH } from "../helpers/constant.helper";

export class ProductController  {
    router: Router = Router();

    constructor() {
        this.router.get(BASE_PATH, this.getProducts);
        this.router.post(BASE_PATH,this.createProduct);
        this.router.put(BASE_PATH, this.updateProduct);
        this.router.delete(`${BASE_PATH}:id`, this.deleteProduct);
    }

    getProducts = async(req: Request, res: Response, next: NextFunction) => {
        res.send('Bravo');
    }

    createProduct = async(req: Request, res: Response, next: NextFunction) => {
        
    }

    updateProduct = async(req: Request, res: Response, next: NextFunction) => {
        
        
    }

    deleteProduct = async(req: Request, res: Response, next: NextFunction) => {
        
    }

}