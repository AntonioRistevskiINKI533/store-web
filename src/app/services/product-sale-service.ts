import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActionResult, AddProductSaleRequest, ApiClient, ProductSaleData, ProductSaleDataPagedModel, UpdateProductSaleRequest } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class ProductSaleService {

    constructor(private apiClient: ApiClient) { }

    addProductSale(body: AddProductSaleRequest | undefined): Observable<ActionResult> {
        return this.apiClient.addProductSale(body);
    }

    updateProductSale(body: UpdateProductSaleRequest | undefined): Observable<ActionResult> {
        return this.apiClient.updateProductSale(body);
    }

    getProductSale(productId: number | undefined): Observable<ProductSaleData> {
        return this.apiClient.getProductSale(productId);
    }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, dateFrom: Date | undefined, dateTo: Date | undefined, productId: number | undefined): Observable<ProductSaleDataPagedModel> {
        return this.apiClient.getAllProductSalesPaged(pageIndex, pageSize, dateFrom, dateTo, productId);
    }

    removeProductSale(productSaleId: number | undefined): Observable<ActionResult> {
        return this.apiClient.removeProductSale(productSaleId);
    }

}