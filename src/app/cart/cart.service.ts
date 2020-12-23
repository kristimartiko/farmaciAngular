import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from '../products/product.module';
import { identifierModuleUrl } from '@angular/compiler';
import { Observable, Subject } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';
import { Cart } from './cart.model';


@Injectable({providedIn: 'root'})
export class CartService {

    constructor(private http: HttpClient) {}

    getProducts(userId: number) {
        return this.http.get(`http://localhost:3000/users/${userId}/cart`);
    }


    addItemToCart(p: Product, userId: number) {
        return this.http.post<Product>("http://localhost:3000/cart", {
            name: p.name,
            price: p.price,
            imgPath: p.imgPath,
            p_id: p.id,
            quantity: 1,
            userId: userId
        }).subscribe((postData: any) => {
            console.log(postData);
        });
    }

    deleteItemFromCart(id: number) {
        return this.http.delete(`http://localhost:3000/cart/${id}`);
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
        return this.http.get(`http://localhost:3000/cart/${id}`);
    }

    decrementQuantity(id: number) {
        return this.http.get(`http://localhost:3000/cart/${id}`);
    }

    deleteItems() {
        return this.http.delete("http://localhost:3000/cart");
    }
}