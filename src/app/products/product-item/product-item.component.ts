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
    this.cartService.getProducts(this.authService.getActualUserId()).subscribe((cartProducts: Product[]) => {
      this.cartProduct = cartProducts;
      console.log(this.cartProduct);
      for(let cartElemet of this.cartProduct) {
        if(cartElemet.name == this.product.name) {
            this.newQuantity = cartElemet.quantity + 1;
            this.cartService.modifyProduct(cartElemet, this.newQuantity).subscribe((responseData) => {
              this.snackBar.open('Successfully added '+this.product.name+ ' to the shopping cart!', '', {
                duration: 3000
              })
            });
            return;
        }
      }
      this.cartService.addItemToCart(this.product, this.authService.getActualUserId());
      this.snackBar.open('Successfully added '+this.product.name+ ' to the shopping cart!', '', {
        duration: 3000
      })
    });
  }

  
}
