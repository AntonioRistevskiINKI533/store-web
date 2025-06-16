import { Time } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductData, UpdateProductSaleRequest } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { ProductSaleService } from 'src/app/services/product-sale-service';
import { ProductService } from 'src/app/services/product-service';

@Component({
  selector: 'app-edit-product-sale',
  templateUrl: './edit-product-sale.component.html',
  styleUrls: ['./edit-product-sale.component.scss']
})
export class EditProductSaleComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  time: Time;
  products: ProductData[];
  body: UpdateProductSaleRequest | undefined = new UpdateProductSaleRequest();
  
  constructor(
    private _productService:ProductService,
    private _productSaleService:ProductSaleService,
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<EditProductSaleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.body!.id = data.id;
  }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      product:[null, [Validators.required]],
      date: [null, [Validators.required]],
      time: [null, [Validators.required]],
      pricePerUnit: [null, [Validators.required]],
      soldAmount: [null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getAllProductsPaged();
    this.getProductSale();
  }

  getProductSale() {
    this._productSaleService.getProductSale(this.body!.id).subscribe({
      next: data => {
        this.body!.productId = data.productId!;
        this.body!.date = data.date!;
        this.body!.pricePerUnit = data.pricePerUnit!;
        this.body!.soldAmount = data.soldAmount!;
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  editProductSale() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    if (this.time && this.body!.date) {
      this.body!.date = new Date(this.body!.date);
      const [hours, minutes] = this.time.toString().split(':').map(Number);
      this.body!.date.setHours(hours);
      this.body!.date.setMinutes(minutes);
    }

    this._productSaleService.updateProductSale(this.body).subscribe({
      next: data => {
        this._snackBarHelper.success();
        this.dialogRef.close(true);
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  getAllProductsPaged() {
    this._productService.getAllPaged(0, 9999999).subscribe(data => {
      this.products = data.items!;
    });
  }

}