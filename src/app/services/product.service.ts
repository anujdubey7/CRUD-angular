import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';

// {} [] *

export interface product{
  id: number;
  name : string;
  price: number;
  category: string;
  mfd: Date;
  stock: boolean;
  discount: number;
  description : string;
}

@Injectable({
  providedIn: 'root',
  
})
export class ProductService {

  private productDetails : product[] = [];

  addProduct(data: any): Observable<any>{
   return this._http.post('http://localhost:3000/product', data);
  }

  constructor(private _http: HttpClient) {
  }

  
  getProductList(): Observable<any>{
    return this._http.get('http://localhost:3000/product');
   }
  
  deleteProduct(id: string){
    return this._http.delete(`http://localhost:3000/product/${id}`)
  }

  getProductById(id: string){
    return this._http.get(`http://localhost:3000/product/${id}`)
  }
  updateProduct(id: string, updatedProduct: product): Observable<product> {
    return this._http.put<product>(`http://localhost:3000/product/${id}`, updatedProduct);
  }
  
}

