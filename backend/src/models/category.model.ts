import { BaseModel } from "./base.model";

export interface ICategory {
    category_id?: number;
    name: string;
    active: boolean;
};

export class CategoryModel extends BaseModel {
    
    constructor() {
        super();
        this.tableName = 'category';
        this.primaryKey = 'category_id';
    }

    find() {
        return this.sqlFind<ICategory>();
    }

    create(data: ICategory) {
        return this.sqlCreate<ICategory>(data);
    }

    update(data: ICategory, id: number) {
        return this.sqlUpdate<ICategory>(id, data);
    }

    delete(id: number) {
        return this.sqlDelete(id);
    }
}