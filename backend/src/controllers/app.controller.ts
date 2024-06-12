import { API } from "../config/dotenv.config";
import { CategoryController } from "./category.controller";
import { ProductController } from "./product.controller";
import { ExpressApp } from "../app";

export class AppController {
    app: ExpressApp;

    constructor(app: ExpressApp){
        this.app = app;
        this.app.use(`${API}/category`, new CategoryController().router);
        this.app.use(`${API}/product`, new ProductController().router);
    }
}