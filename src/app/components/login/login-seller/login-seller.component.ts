import { Component, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

// {} [] *


@Component({
  selector: 'app-login-seller',
  standalone: false,
  
  templateUrl: './login-seller.component.html',
  styleUrl: './login-seller.component.css'
})
export class LoginSellerComponent {
  router = inject(Router)
  private _snackbar = inject(MatSnackBar);
  adminDetail = {
    emailId: '',
    password: '',
    role: 'ADMIN'
  }

  isLoading = false;

  adminLogin(){
    this.isLoading=true;

    if(this.adminDetail.emailId=='dmanuj663@gmail.com' && this.adminDetail.password=='12345'){
      const snackbarRef  = this._snackbar.open('Login Successful', 'Okay');
      localStorage.setItem('adminDetail', JSON.stringify(this.adminDetail));
      snackbarRef.onAction().subscribe(()=>{
        this.router.navigateByUrl('product-list');
      });
    }
    else{
      this._snackbar.open('Wrong Credentials', 'Okay');
      this.isLoading=false;

    }
  }
}
