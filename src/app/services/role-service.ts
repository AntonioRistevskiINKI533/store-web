import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiClient, RoleData } from "../api/client";

@Injectable({
    providedIn: 'root'
})

export class RoleService {

    constructor(private apiClient: ApiClient) { }

    getAll(): Observable<RoleData[]> {
        return this.apiClient.getAllRoles();
    }

}