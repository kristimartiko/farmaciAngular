import { Component, OnInit, Input, Inject } from '@angular/core';
import { Product } from '../product.module';
import { ProductsService } from '../products.service';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from 'src/app/auth/auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: any;
  private cartProduct: any[] = [];
  private newQuantity;

  constructor(private productService: ProductsService,
              private cartService: CartService,
              private authService: AuthService,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  addToCart() {
    if(this.product.quantity < 0) {
      this.snackBar.open('There is no , '+this.product.name+'  left in stock!', '', {
        duration: 3000
      });
      return;
    }
    this.cartService.addItemToCart(this.product.id);
    this.product.quantity = this.product.quantity - 1;
  }

  
}
