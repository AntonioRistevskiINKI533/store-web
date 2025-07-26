import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActionResult, AddCompanyRequest, ApiClient, CompanyData, CompanyDataPagedModel, UpdateCompanyRequest } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class CompanyService {

    constructor(private apiClient: ApiClient) { }

    addCompany(body: AddCompanyRequest | undefined): Observable<ActionResult> {
        return this.apiClient.addCompany(body);
    }

    updateCompany(body: UpdateCompanyRequest | undefined): Observable<ActionResult> {
        return this.apiClient.updateCompany(body);
    }

    getCompany(companyId: number | undefined): Observable<CompanyData> {
        return this.apiClient.getCompany(companyId);
    }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, name: string | undefined = undefined): Observable<CompanyDataPagedModel> {
        return this.apiClient.getAllCompaniesPaged(pageIndex, pageSize, name);
    }

    removeCompany(companyId: number | undefined): Observable<ActionResult> {
        return this.apiClient.removeCompany(companyId);
    }

}