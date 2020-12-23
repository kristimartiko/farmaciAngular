import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Product } from 'src/app/products/product.module';
import { ProductsService } from 'src/app/products/products.service';
import { ProductdialogComponent } from './productdialog/productdialog.component';

@Component({
  selector: 'app-productmanagment',
  templateUrl: './productmanagment.component.html',
  styleUrls: ['./productmanagment.component.css']
})
export class ProductmanagmentComponent implements OnInit {

  @Input() products: Product[];

  constructor(private productService: ProductsService,
    private dialog: MatDialog,
    private snavkBar: MatSnackBar) { }

  ngOnInit(): void {
    this.productService.recieveData().subscribe((products: Product[]) => {
      this.products = products;
    }, error => {
      console.log(this.products);
    });
  }

  openDialog() {
    let dialogRef = this.dialog.open(ProductdialogComponent, {width: '40%'});

    dialogRef.afterClosed().subscribe(changed => {
      if(changed) {
        this.productService.recieveData().subscribe(data => {
          this.products = data;
        });
      }
    })
  }

  updateProduct(product: Product) {
    let dialogRef = this.dialog.open(ProductdialogComponent, {
      width: '40%',
      data: product
    });

    dialogRef.afterClosed().subscribe(changed => {
      if(changed) {
        this.productService.recieveData().subscribe(data => {
          this.products = data;
        });
      }
    });
  }

  deleteProduct(index: number) {
    this.productService.deleteProduct(this.products[index]).subscribe(() => {
      this.products.splice(index, 1);
      this.snavkBar.open('Product deleted successfully', '', {
        duration: 3000
      })
    })
  }

}
