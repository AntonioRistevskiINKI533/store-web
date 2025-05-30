import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { CompanyDataPagedModel } from "../api/client";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
    providedIn: 'root'
})

export class SnackBarHelper {

    constructor(private _snackBar: MatSnackBar) { }

    success(): void {
        this._snackBar.open('Success', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-success']
        });
    }

    error(message: string): void {
        this._snackBar.open(`Error: ${message}`, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
        });
    }

}