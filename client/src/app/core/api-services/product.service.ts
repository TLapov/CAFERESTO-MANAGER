import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    http: HttpClient = inject(HttpClient);
    basePath: string = `${environment.apiBasePath}/product`;

    getProducts() {

    }

    createProduct() {

    }

    updateProduct() {

    }

    deleteProduct() {
        
    }
}