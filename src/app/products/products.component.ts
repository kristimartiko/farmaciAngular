import { Component, OnInit } from '@angular/core';
import { Product } from './product.module';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = new Product("", "", "");

  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    this.productService.recieveData().subscribe((product: Product[]) => {
      this.products = product;
      console.log(this.products)
    });
  }

}
