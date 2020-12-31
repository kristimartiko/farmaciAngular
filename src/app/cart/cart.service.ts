import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../products/product.module';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable, Subject } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { Cart } from './cart.model';
import { MatSnackBar } from '@angular/material';
import { User } from '../auth/user.model';


@Injectable({providedIn: 'root'})
export class CartService {

    constructor(private http: HttpClient,
        private snackBar: MatSnackBar) {}

    getProducts(userId: number) {
        return this.http.get("http://localhost:8787/users/cart");
    }

    addItemToCart(id: number) {
        return this.http.post(`http://localhost:8787/cart/add{id}`, id).subscribe((postData: any) => {
            console.log(postData);
            this.snackBar.open("You added " + postData.product.name + " to the shopping cart!", "", {
                duration: 3000
            });
        });
    }

    deleteItemFromCart(id: number): Observable<void> {
        return this.http.delete<void>(`http://localhost:8787/cart/delete${id}`);
    }

    modifyProduct(product: any, newQuantity: number) {
        return this.http.put(`http://localhost:3000/cart/${product.id}`, {
            name: product.name,
            price: product.price,
            imgPath: product.imgPath,
            p_id: product.p_id,
            quantity: newQuantity,
            userId: product.userId,
            id: product.id
        });
    }

    incrementQuantity(id: number) {
        return this.http.get(`http://localhost:8787/cart/increment${id}`);
    }

    decrementQuantity(id: number) {
        return this.http.get(`http://localhost:8787/cart/decremet${id}`);
    }

    deleteItems() {
        return this.http.delete("http://localhost:3000/cart");
    }
}