import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) { }





  GetUserOrders(id: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}api/Orders/GetUserOrders?UserId=${id}`,

      {
        headers,
        // responseType: 'text' as 'json' // 👈
      }
    );


  }

  GetOrderItems(id: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}api/Orders/GetOrderItems?IDFromPaymob=${id}`,

      {
        headers,
        // responseType: 'text' as 'json' // 👈
      }
    );


  }

}
