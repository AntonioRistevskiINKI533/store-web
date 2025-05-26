import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiClient, LoginRequest, LoginResponse, UserDataPagedModel } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private apiClient: ApiClient) { }

    login(body: LoginRequest | undefined): Observable<LoginResponse> {
        return this.apiClient.login(body);
    }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, fullName: string | undefined, roleId: number | undefined): Observable<UserDataPagedModel> {
        return this.apiClient.getAllUsersPaged(pageIndex, pageSize, fullName, roleId);
    }

}