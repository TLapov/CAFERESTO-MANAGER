import { HttpStatusCode } from "../helpers/constant.helper";
import { CategoryModel, ICategory } from "../models/category.model";
import { AppError } from "../utils/error.util";

export class CategoryService {
    categoryModel: CategoryModel = new CategoryModel();

    async getCategories() {
        const categories = await this.categoryModel.find();
        return categories;
    }

    async createCategory(data: ICategory) {
            const category = await this.categoryModel.create(data);
            return category;
    }

    async updateCategory(data: ICategory) {

        const category = await this.categoryModel.update(data, data.category_id as number);

        if(!category.affectedRows) {
            throw new AppError(HttpStatusCode.NOT_FOUND, "Neuspješno promjena kategorije");
        }
        
        return category;
    }

    async deleteCategory(id: number) {
        const category = await this.categoryModel.delete(id);

        if(!category.affectedRows) {
            throw new AppError(HttpStatusCode.NOT_FOUND, "Neuspješno brisanje kategorije!!!");
        }

        return category;

    }

    
}
