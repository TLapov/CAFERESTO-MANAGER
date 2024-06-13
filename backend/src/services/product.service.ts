import { HttpStatusCode } from "../helpers/constant.helper";
import { IProduct, ProductModel } from "../models/product.model";
import { AppError } from "../utils/error.util";
import AppValidator from "../utils/validation.util";

export class ProductService {
    productModel: ProductModel = new ProductModel();
    appValidator: AppValidator = new AppValidator({
        name: {required: [true, 'Ime kategorije je obavezno'], minLength: [4, 'Ime mora biti dugačko 4 znaka']}
    });

    async getProducts() {
        const products = await this.productModel.find();
        return products;
    }

    async createProduct(data: IProduct) {

        this.appValidator.validate<IProduct>(data);

        if(this.appValidator.error !== null) {
            throw new AppError(HttpStatusCode.NOT_FOUND, this.appValidator.error);
        }

        const product = await this.productModel.create(data);
        return product;
    }

    async updateProduct(data: IProduct) {

        const product = await this.productModel.update(data.product_id as number, data);

        if(!product.affectedRows) {
            throw new AppError(HttpStatusCode.NOT_FOUND, "Neuspješno promjena proizvoda");
        }
        
        return product;
    }

    async deleteProduct(id: number) {
        const product = await this.productModel.delete(id);

        if(!product.affectedRows) {
            throw new AppError(HttpStatusCode.NOT_FOUND, "Neuspješno brisanje kategorije!!!");
        }

        return product;

    }
    
}