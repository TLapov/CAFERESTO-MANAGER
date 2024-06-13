import { BaseModel } from "./base.model";
import { CategoryModel } from "./category.model";

export interface IProduct {
    product_id?: number,
    name: string,
    price: number,
    category: number,
    active: boolean
};

export class ProductModel extends BaseModel {
    
    constructor() {
        super();
        this.tableName = 'products';
        this.primaryKey = 'product_id'
        this.relationTable = new CategoryModel();
        this.forgeinKey = 'category';
    }

    find() {
        return this.sqlFind<IProduct>();
    }

    create(data: IProduct) {
        return this.sqlCreate<IProduct>(data);
    }

    update(id: number, data: IProduct) {
        return this.sqlUpdate<IProduct>(id, data);
    }

    delete(id: number) {
        return this.sqlDelete(id);
    }

}
