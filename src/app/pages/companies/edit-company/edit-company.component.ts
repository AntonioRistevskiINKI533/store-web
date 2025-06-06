import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UpdateCompanyRequest } from 'src/app/api/client';
import { SnackBarHelper } from 'src/app/helpers/snack-bar.helper';
import { CompanyService } from 'src/app/services/company-service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {

  @ViewChild('mainNgForm') mainNgForm: NgForm;
  mainForm: FormGroup;

  body: UpdateCompanyRequest | undefined = new UpdateCompanyRequest();
  
  constructor(
    private _companyService:CompanyService, 
    private _formBuilder:FormBuilder,
    private _snackBarHelper: SnackBarHelper,
    public dialogRef: MatDialogRef<EditCompanyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
      this.body!.id = data.id;
  }

  ngOnInit(): void {
    this.mainForm = this._formBuilder.group({
      name: [null, [Validators.required]],
      address: [null, [Validators.required]],
      phone:[null, [Validators.required]],
    })
  }

  ngAfterViewInit() {
    this.getCompany();
  }

  getCompany() {
    this._companyService.getCompany(this.body!.id).subscribe({
      next: data => {
        this.body!.name = data.name!;
        this.body!.address = data.address!;
        this.body!.phone = data.phone!;
      },
      error: err => {
        this._snackBarHelper.error(err);
      }
    });
  }

  editCompany() {
    if (this.mainNgForm.invalid) {
      this._snackBarHelper.error('Please fill in all required fields');
      return;
    }

    this._companyService.updateCompany(this.body).subscribe({
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