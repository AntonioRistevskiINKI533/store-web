import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActionResult, AddProductSaleRequest, ApiClient, ProductSaleData, ProductSaleDataPagedModel, UpdateProductSaleRequest } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class ProductSaleService {

    constructor(private apiClient: ApiClient) { }

    addProductSale(body: AddProductSaleRequest | undefined): Observable<ActionResult> {
        if (body!.date) {
            const localDate = body!.date;
            const utcDate = new Date(localDate!.getTime() - localDate!.getTimezoneOffset() * 60000);
            body!.date = utcDate;
        }
        return this.apiClient.addProductSale(body);
    }

    updateProductSale(body: UpdateProductSaleRequest | undefined): Observable<ActionResult> {
        if (body!.date) {
            const localDate = body!.date;
            const utcDate = new Date(localDate!.getTime() - localDate!.getTimezoneOffset() * 60000);
            body!.date = utcDate;
        }
        return this.apiClient.updateProductSale(body);
    }

    getProductSale(productId: number | undefined): Observable<ProductSaleData> {
        return this.apiClient.getProductSale(productId);
    }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, dateFrom: Date | undefined = undefined, dateTo: Date | undefined = undefined, productId: number | undefined = undefined): Observable<ProductSaleDataPagedModel> {
        return this.apiClient.getAllProductSalesPaged(pageIndex, pageSize, dateFrom, dateTo, productId);
    }

    removeProductSale(productSaleId: number | undefined): Observable<ActionResult> {
        return this.apiClient.removeProductSale(productSaleId);
    }

}