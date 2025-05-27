import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiClient, ProductDataPagedModel } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor(private apiClient: ApiClient) { }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, companyId: number | undefined, productName: string | undefined): Observable<ProductDataPagedModel> {
        return this.apiClient.getAllProductsPaged(pageIndex, pageSize, companyId, productName);
    }

}