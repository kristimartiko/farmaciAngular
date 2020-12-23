import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ProductItemComponent } from './products/product-item/product-item.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AdminGuard } from './admin/admin-guard.service';
import { AdminComponent } from './admin/admin.component';
import { UsermanagmentComponent } from './admin/usermanagment/usermanagment.component';
import { ProductmanagmentComponent } from './admin/productmanagment/productmanagment.component';


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'cart', component: CartComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'admin', canActivate: [AdminGuard], component: AdminComponent, children: [
    {path: 'users', component: UsermanagmentComponent}
  ]},
  {path: 'users', component: UsermanagmentComponent},
  {path: 'productsUpdate', component: ProductmanagmentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
