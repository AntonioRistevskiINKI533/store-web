import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiClient, ProductSaleDataPagedModel } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class ProductSaleService {

    constructor(private apiClient: ApiClient) { }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, dateFrom: Date | undefined, dateTo: Date | undefined, productId: number | undefined): Observable<ProductSaleDataPagedModel> {
        return this.apiClient.getAllProductSalesPaged(pageIndex, pageSize, dateFrom, dateTo, productId);
    }

}