import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ActionResult, AddUserRequest, ApiClient, LoginRequest, LoginResponse, UpdateUserProfileRequest, UpdateUserRequest, UserData, UserDataPagedModel } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class UserService {

    constructor(private apiClient: ApiClient) { }

    login(body: LoginRequest | undefined): Observable<LoginResponse> {
        return this.apiClient.login(body);
    }

    getProfile(): Observable<UserData> {
        return this.apiClient.getUserProfile();
    }

    updateUserProfile(body: UpdateUserProfileRequest | undefined): Observable<ActionResult> {
        return this.apiClient.updateUserProfile(body);
    }
    
    addUser(body: AddUserRequest | undefined): Observable<ActionResult> {
        return this.apiClient.addUser(body);
    }

    updateUser(body: UpdateUserRequest | undefined): Observable<ActionResult> {
        return this.apiClient.updateUser(body);
    }

    getUser(userId: number | undefined): Observable<UserData> {
        return this.apiClient.getUser(userId);
    }

    getAllPaged(pageIndex: number | undefined, pageSize: number | undefined, fullName: string | undefined, roleId: number | undefined): Observable<UserDataPagedModel> {
        return this.apiClient.getAllUsersPaged(pageIndex, pageSize, fullName, roleId);
    }

}