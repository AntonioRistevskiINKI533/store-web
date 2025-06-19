import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CompanyData, UpdateProductRequest } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { CompanyService } from 'src/app/services/company-service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  registrationNumber: string = '';
  companies: CompanyData[] = [];
  body: UpdateProductRequest | undefined = new UpdateProductRequest();

  companyPagination: {
    pageIndex: number;
    pageSize: number;
    totalItems: number;
  } = {
    pageIndex: 0,
    pageSize: 20,
    totalItems: 0
  }
  
  constructor(
    private _productService:ProductService,
    private _companyService:CompanyService, 
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<EditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.body!.id = data.id;
  }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      name:[null, [Validators.required]],
      company: [null, [Validators.required]],
      price: [null, [Validators.required]],
      registrationNumber: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getAllCompaniesPaged();
    this.getProduct();
  }

  getProduct() {
    this._productService.getProduct(this.body!.id).subscribe({
      next: data => {
        this.body!.name = data.name!;
        this.body!.companyId = data.companyId!;
        this.body!.price = data.price!;
        this.registrationNumber = data.registrationNumber!;
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  editProduct() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    this._productService.updateProduct(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
        this.dialogRef.close(true);
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  onCompanySelectOpened() {
    setTimeout(() => {
      const panel = document.querySelector('.mat-select-panel');
      if (panel) {
        panel.addEventListener('scroll', this.onCompanyScroll.bind(this));
      }
    });
  }

  onCompanyScroll(event: any) {
    const target = event.target;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10 && (this.companyPagination.totalItems > this.companies.length)) {
      this.getAllCompaniesPaged();
    }
  }

  getAllCompaniesPaged() {
    this._companyService.getAllPaged(this.companyPagination.pageIndex, this.companyPagination.pageSize).subscribe(data => {
      this.companyPagination.totalItems = data.totalItems!;

      const newCompanies = data.items ?? [];
      this.companies = this.companies.length > 0 ? [...this.companies, ...newCompanies] : newCompanies;

      if (this.companyPagination.totalItems > this.companies.length) {
        this.companyPagination.pageIndex++;
      }

    });
  }

}