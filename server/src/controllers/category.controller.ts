import { Request, Response, Router } from "express";

export class CategoryController {
    path:string = '/category';
    router: Router = Router();
    
    constructor(){
        this.router.get(this.path, this.getAll);
    }

    getAll(req: Request, res: Response) {
        res.send('Hello world123');
    }
   
}

export const categoryController = new CategoryController().router;