import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AddProductRequest, CompanyData } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { CompanyService } from 'src/app/services/company-service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  companies: CompanyData[];
  body: AddProductRequest | undefined = new AddProductRequest();
  
  constructor(
    private _productService:ProductService, 
    private _companyService:CompanyService, 
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<AddProductComponent>
    ) 
    { }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      name:[null, [Validators.required]],
      company: [null, [Validators.required]],
      price: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getAllCompaniesPaged();
  }

  addProduct() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    this._productService.addProduct(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
        this.dialogRef.close(true);
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  getAllCompaniesPaged() {
    this._companyService.getAllPaged(0, 9999999).subscribe(data => {
      this.companies = data.items!;
    });
  }

}