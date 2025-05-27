import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiClient, CompanyDataPagedModel } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class CompanyService {

    constructor(private apiClient: ApiClient) { }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined): Observable<CompanyDataPagedModel> {
        return this.apiClient.getAllCompaniesPaged(pageIndex, pageSize);
    }

}