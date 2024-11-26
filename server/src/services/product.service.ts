import { HttpStatusCode } from "../config/constants.config";
import { categoryModel, ICategory } from "../models/category.model";
import { AppError } from "./error.service";

class ProductService {
    
    async getProducts() {
        const categories = await categoryModel.findAll<ICategory>();
        return categories;
    }

    async createProduct(data: ICategory) {
        const category = await categoryModel.create(data);
        if(category.affectedRows == 0) throw new AppError(HttpStatusCode.BAD_REQUEST, 'Create category fail!!!');
        return data;
    }

    async updateProduct(data: ICategory) {
        const category = await categoryModel.update(data.category_id as number, data);
        if(category.affectedRows == 0) throw new AppError(HttpStatusCode.BAD_REQUEST, 'Update category fail!!!');
    }

    async deleteProduct(id: number) {
        const category = await categoryModel.delete(id);
        if(category.affectedRows == 0) throw new AppError(HttpStatusCode.BAD_REQUEST, 'Delete category fail!!!');
    }
}

export const categoryService = new ProductService();