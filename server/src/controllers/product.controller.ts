import { NextFunction, Request, Response} from "express";
import { AppResponse } from "../services/response.service";
import { HttpStatusCode } from "../config/constants.config";

export class ProductController {

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            AppResponse.notImplemented(res);
        } catch(error: unknown) {
            next(error)
        }
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            AppResponse.notImplemented(res);    
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const payload = req.body;
            AppResponse.notImplemented(res);          
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = Number(req.params.id);
            AppResponse.notImplemented(res);  
        } catch (error) {
            next(error);
        }
    }
}

export const productController = new ProductController();