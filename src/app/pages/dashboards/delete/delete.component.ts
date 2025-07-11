import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { CompanyService } from 'src/app/services/company-service';
import { ProductSaleService } from 'src/app/services/product-sale-service';
import { ProductService } from 'src/app/services/product-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

  id: number | undefined;
  item: string | undefined;
  text: string | undefined;
  date: string | undefined;
  
  constructor(
    private _userService: UserService,
    private _companyService: CompanyService,
    private _productService: ProductService,
    private _productSaleService: ProductSaleService,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.id = data.id;
      this.item = data.item;
      this.text = data.text;
      this.date = data.date;
  }

  delete() {
    if (this.item === 'user') {
      this._userService.removeUser(this.id).subscribe({
        next: data => {
          this._snackBarHelper.success();
          this.dialogRef.close(true);
        },
        error: err => {
          this._snackBarHelper.error(err);
        }
      });
    } else if (this.item === 'company') {
      this._companyService.removeCompany(this.id).subscribe({
        next: data => {
          this._snackBarHelper.success();
          this.dialogRef.close(true);
        },
        error: err => {
          this._snackBarHelper.error(err);
        }
      });
    } else if (this.item === 'product') {
      this._productService.removeProduct(this.id).subscribe({
        next: data => {
          this._snackBarHelper.success();
          this.dialogRef.close(true);
        },
        error: err => {
          this._snackBarHelper.error(err);
        }
      });
    } else if (this.item === 'product sale') {
      this._productSaleService.removeProductSale(this.id).subscribe({
        next: data => {
          this._snackBarHelper.success();
          this.dialogRef.close(true);
        },
        error: err => {
          this._snackBarHelper.error(err);
        }
      });
    }
  }

}