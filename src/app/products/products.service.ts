import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './product.module';
import { Observable, Subject } from 'rxjs';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ProductsService {

    private products: Product[] = [
        new Product('Ranital', '14.99', 'https://img-new.cgtrader.com/items/771790/6b0a1548cb/medicine-pills-package-3d-model-rigged-obj-mtl-3ds-fbx-blend-dae.png'),
        new Product('Codiovan', '9.60', 'https://static.wixstatic.com/media/04f121_1ade7959184d417c9fa6572f1c6b2607~mv2.png/v1/fill/w_576,h_576,al_c,lg_1/04f121_1ade7959184d417c9fa6572f1c6b2607~mv2.png'),
        new Product('Ibuprofen', '4.99', 'https://www.meijer.com/content/dam/meijer/product/0004/12/5082/59/0004125082595_2_A1C1_1200.png')
    ];
       
    constructor(private http: HttpClient) {}

    recieveData() {
        return this.http.get<Product[]>(" http://localhost:8787/products");
    }

    addNewProduct(formValue: any): Observable<Product> {
        return this.http.post<Product>('http://localhost:8787/products/add', formValue);
    }

    deleteProduct(p: Product) {
        return this.http.delete("http://localhost:8787/products/delete{id}");
    }

    updateProduct(p: Product) {
        return this.http.put<Product>("http://localhost:8787/products/update{id}", p);
    }
}