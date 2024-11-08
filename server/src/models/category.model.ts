import { BaseModel } from "./base.model";

export interface ICategory {
    category_id?: number;
    name: string;
    active: boolean;
};

class CategoryModel extends BaseModel {
    constructor() {
        super();
        this.table = 'category',
        this.primaryKey = 'category_id'
    }
}

export const categoryModel = new CategoryModel();