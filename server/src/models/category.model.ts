import { BaseModel } from "./base.model";

class CategoryModel extends BaseModel {
    constructor() {
        super();
        this.table = 'category',
        this.primaryKey = 'category_id'
    }
}

export const categoryModel = new CategoryModel();