import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductdialogComponent } from './productdialog.component';

describe('ProductdialogComponent', () => {
  let component: ProductdialogComponent;
  let fixture: ComponentFixture<ProductdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
