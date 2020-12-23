import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ProductsService } from 'src/app/products/products.service';

@Component({
  selector: 'app-productdialog',
  templateUrl: './productdialog.component.html',
  styleUrls: ['./productdialog.component.css']
})
export class ProductdialogComponent implements OnInit {

  productEditForm: FormGroup;
  isUpdate: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public p: any,
  private productService: ProductsService,
  private matDialogRef: MatDialogRef<ProductdialogComponent>,
  private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(this.p) {
      this.productEditForm = new FormGroup({
        'name': new FormControl(this.p.name, Validators.required),
        'price': new FormControl(this.p.price, Validators.required),
        'img': new FormControl(this.p.imgPath, Validators.required),
        'id': new FormControl(this.p.id, Validators.required)
      });
    }
    else {
      this.productEditForm = new FormGroup({
        'name': new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required),
        'imgPath': new FormControl(null, Validators.required)
      });
    }
  }

  onSubmit() {
    if(!this.productEditForm.valid) return;

    if(!this.isUpdate) {
      this.productService.addNewProduct(this.productEditForm.value).subscribe(() => {
        this.matDialogRef.close(true);
        this.snackBar.open('Product added successfully!', '', {
          duration: 3000
        });
      }, error => {
        console.log(error);
      });
    }
  }

  onClose() {
    this.matDialogRef.close(false);
  }

}
