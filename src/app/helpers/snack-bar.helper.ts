import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { ApiException, CompanyDataPagedModel } from "../api/client";
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

    error(err: any): void {
        let finalMessage = '';
        let messages: string[] = [];
        if (err instanceof ApiException) {
            try {
                const serverError = JSON.parse(err.response);

                for (const field in serverError.errors) {
                    if (serverError.errors.hasOwnProperty(field)) {
                        const fieldErrors = serverError.errors[field];
                        messages.push(`${fieldErrors.join(', ')}`);
                    }
                }

                finalMessage = messages.join(', ');
            } catch (parseError) {
                finalMessage = err.response;
            }
        } else {
            finalMessage = err;
        }

        this._snackBar.open(`Error${messages.length > 1? 's' : ''}: ${finalMessage.toLowerCase()}`, 'Close', {
            duration: 3000,
            panelClass: ['snackbar-error']
        });
    }

}