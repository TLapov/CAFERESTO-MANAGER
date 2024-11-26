import { BaseModel } from "./base.model";

export interface IProduct {
    product_id?: number;
    product_name: string;
    quantity: number,
    price: number,
};

class ProductModel extends BaseModel {
    constructor() {
        super();
        this.table = 'product',
        this.primaryKey = 'product_id'
    }
}

export const productModel = new ProductModel();