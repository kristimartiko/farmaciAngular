import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CartComponent } from './cart/cart.component';
import { CartdialogComponent } from './cart/cartdialog/cartdialog.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoadingComponent } from './shared/loading-spinner.component';
import { AdminComponent } from './admin/admin.component';
import { UsermanagmentComponent } from './admin/usermanagment/usermanagment.component';
import { UserdialogComponent } from './admin/usermanagment/userdialog/userdialog.component';
import { ProductmanagmentComponent } from './admin/productmanagment/productmanagment.component';
import { ProductdialogComponent } from './admin/productmanagment/productdialog/productdialog.component';
import { FilterPipe } from './admin/usermanagment/filter.pipe';
import {MatSnackBarModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatInputModule,  MatDialogModule} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { TokenInterceptorService} from './token-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductItemComponent,
    NavbarComponent,
    CartComponent,
    CartdialogComponent,
    HomeComponent,
    AuthComponent,
    LoginComponent,
    SignupComponent,
    LoadingComponent,
    AdminComponent,
    UsermanagmentComponent,
    UserdialogComponent,
    ProductmanagmentComponent,
    ProductdialogComponent,
    FilterPipe,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  providers: [ {provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
