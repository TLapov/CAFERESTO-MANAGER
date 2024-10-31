import { BaseModel } from "./base.model";

export class CategoryModel extends BaseModel {
    constructor(){
        super();
        this.table = 'category',
        this.primaryKey = 'category_id'
    }

    getCategories() {
        return this.sqlFind();
    }
}