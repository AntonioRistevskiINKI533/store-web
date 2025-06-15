import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductSaleComponent } from './edit-product-sale.component';

describe('EditProductSaleComponent', () => {
  let component: EditProductSaleComponent;
  let fixture: ComponentFixture<EditProductSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProductSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
