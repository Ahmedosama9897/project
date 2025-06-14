import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private readonly _HttpClient = inject(HttpClient)

  getAllProducts(pagesize: number): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Products/GetFilteredProducts?newwest=true&pageSize=${pagesize}`,
      {
        headers
      });

  }
  getAllProductstopsell(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Products/GetFilteredProducts?mostSold=true`,
      {
        headers
      });

  }


  getSpecificProducts(id: string | null): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(`${environment.baseUrl}Products/GetProductById?id=${id}`,
      {
        headers
      });

  }
}
