import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './components/add-product/add-product.component';
import { TableComponent } from './components/table/table.component';
import { LoginSellerComponent } from './components/login/login-seller/login-seller.component';
import { LoginVisitorComponent } from './components/login/login-visitor/login-visitor.component';
import { MainPageComponent } from './components/main-page/main-page.component';

// {} [] *

const routes: Routes = [
  {
    path: 'add-product',
    component: AddProductComponent
  },
  {
    path: '',
    component: TableComponent
  },
  {
    path: 'seller-login',
    component: LoginSellerComponent
  },
  {
    path: 'visitor-login',
    component: LoginVisitorComponent
  },
  {
    path: 'product-list',
    component: TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
