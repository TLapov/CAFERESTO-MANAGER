import { NextFunction, Router, Response, Request } from "express";
import { BASE_PATH, HttpStatusCode } from "../helpers/constant.helper";
import { AppResponse } from '../utils/response.util';
import { ProductService } from "../services/product.service";

export class ProductController  {
    router: Router = Router();
    productService = new ProductService();
    
    constructor() {
        this.router.get(BASE_PATH, this.getProducts);
        this.router.post(BASE_PATH,this.createProduct);
        this.router.put(BASE_PATH, this.updateProduct);
        this.router.delete(`${BASE_PATH}:id`, this.deleteProduct);
    }

    getProducts = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getProducts();
            
            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Uspješan dohvat proizvoda', products);

        } catch (error) {
            next(error);
        }
    }

    createProduct = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            await this.productService.createProduct(body);

            AppResponse.createApiResponse(res, HttpStatusCode.CREATED, 'Proizvod je uspješno kreirean');
            
        }catch (err: any) {
            next(err);
        }
    }

    updateProduct = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const body = req.body;
            await this.productService.updateProduct(body);

            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Proizvod je uspješno promijenjen');
            
        }catch (error) {
            next(error);
        }
        
    }

    deleteProduct = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const id = Number(req.params.id);
            await this.productService.deleteProduct(id);

            AppResponse.createApiResponse(res, HttpStatusCode.SUCCESS, 'Proizvod je uspješno izbrisan');

        }catch(err){
            next(err);
        }
        
    }

}