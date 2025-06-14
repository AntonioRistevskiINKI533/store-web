import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActionResult, AddProductRequest, ApiClient, ProductData, ProductDataPagedModel, UpdateProductRequest } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private apiClient: ApiClient) { }

    addProduct(body: AddProductRequest | undefined): Observable<ActionResult> {
        return this.apiClient.addProduct(body);
    }

    updateProduct(body: UpdateProductRequest | undefined): Observable<ActionResult> {
        return this.apiClient.updateProduct(body);
    }

    getProduct(productId: number | undefined): Observable<ProductData> {
        return this.apiClient.getProduct(productId);
    }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, companyId: number | undefined = undefined, productName: string | undefined = undefined): Observable<ProductDataPagedModel> {
        return this.apiClient.getAllProductsPaged(pageIndex, pageSize, companyId, productName);
    }

    removeProduct(productId: number | undefined): Observable<ActionResult> {
        return this.apiClient.removeProduct(productId);
    }

}