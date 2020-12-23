import { Component, Input, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { CartdialogComponent } from './cartdialog/cartdialog.component';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  private newQuantity: number;
  public products: any[] = [];
  index: number;
  //total: number = 0;

  constructor(private cartService: CartService,
    private authService: AuthService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cartService.getProducts(this.authService.getActualUserId()).subscribe((recieveData: any[]) => {
      this.products = recieveData;
      console.log(this.products);
    })
  }

  deleteItem(index: number) {
    this.cartService.deleteItemFromCart(this.products[index].id).subscribe(() => {
      this.products.splice(index, 1);
    }, error => {
      console.log(error);
    });
  }

  incrementQuantity(index: number) {
    this.cartService.incrementQuantity(this.products[index].id).subscribe(() => {
      this.products[index].quantity = this.products[index].quantity + 1;
    }, error => {
      console.log(error);
    });
  }

  decrementQuantity(index: number) {
    if(this.products[index].quantity <= 1) {
      this.cartService.deleteItemFromCart(this.products[index].id).subscribe(() => {
        this.products.splice(index, 1);
      })
    }
    this.cartService.decrementQuantity(this.products[index].id).subscribe(() => {
      this.products[index].quantity = this.products[index].quantity - 1;
    }, error => {
      console.log(error);
    })
  }

  isEmpty(): boolean {
    if(this.products.length == 0) {
      return true;
    } else {
      return false;
    }
  }

   CheckOut() {
    let dialogRef = this.dialog.open(CartdialogComponent, {
      width: '45%',
      data: this.products
    });

    dialogRef.afterClosed().subscribe((changed: boolean) => {
      if(changed) {
        for(let cartEl of this.products) {
          this.cartService.deleteItemFromCart(cartEl.id).subscribe(() => {
            this.snackBar.open('Ordered successfully placed!', '', {
              duration: 3000
            })
          }, error => {
            console.log(error);
          });
        }
        this.products = [];
      }
    })
  }

}
