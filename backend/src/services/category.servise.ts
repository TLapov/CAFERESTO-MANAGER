import { HttpStatusCode } from "../helpers/constant.helper";
import { CategoryModel, ICategory } from "../models/category.model";
import { AppError } from "../utils/error.util";
import AppValidator from "../utils/validation.util";

export class CategoryService {
    categoryModel: CategoryModel = new CategoryModel();
    appValidator: AppValidator = new AppValidator({
        name: {required: [true, 'Ime kategorije je obavezno'], minLength: [4, 'Ime mora biti dugačko 4 znaka']}
    });

    async getCategories() {
        const categories = await this.categoryModel.find();
        return categories;
    }

    async createCategory(data: ICategory) {

        this.appValidator.validate<ICategory>(data);

        if(this.appValidator.error !== null) {
            throw new AppError(HttpStatusCode.NOT_FOUND, this.appValidator.error);
        }

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
