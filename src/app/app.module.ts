import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MainPageComponent } from './components/main-page/main-page.component';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './components/table/table.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { LoginSellerComponent } from './components/login/login-seller/login-seller.component';
import { LoginVisitorComponent } from './components/login/login-visitor/login-visitor.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TableComponent,
    AddProductComponent,
    LoginSellerComponent,
    LoginVisitorComponent,
    SignupComponent,
    NavbarComponent,
    DialogComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MatTableModule, MatButtonModule, MatIconModule, MatSidenavModule, MatFormFieldModule, MatSelectModule, 
    ReactiveFormsModule, FormsModule, MatInputModule, MatDatepickerModule, MatRadioModule, MatMenuModule, MatSnackBarModule,
    MatProgressBarModule, HttpClientModule,MatPaginator , MatPaginatorModule, MatSort, MatSortModule, MatDialogModule
  ],
  providers: [
    provideAnimationsAsync(), provideNativeDateAdapter(),   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
