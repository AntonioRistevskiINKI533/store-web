import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiClient, UserDataPagedModel } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private apiClient: ApiClient) { }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined): Observable<UserDataPagedModel> {
        return this.apiClient.getAllUsersPaged(pageIndex, pageSize);
    }

}