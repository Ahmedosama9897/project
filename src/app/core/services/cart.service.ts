import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient: HttpClient) { }



  cartNumber = new BehaviorSubject<number>(0); // خاصية جديدة لإدارة عدد العناصر في السلة

  // cartNumber: WritableSignal<number> = signal(0);



  addProductToCart(buyerId: string, itemId: string, quantity: number): Observable<any> {
    const token = localStorage.getItem('userToken');
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`   // إضافة التوكن في الهيدر
    });

    return this._HttpClient.post(
      `${environment.baseUrl}Cart/AddToCart?ItemId=${itemId}&Quantity=${quantity}&BuyerId=${buyerId}`,
      {},
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }





  getProductCart(id: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Cart/GetUserCart?UserId=${id}`,

      {
        headers,
        // responseType: 'text' as 'json' // 👈
      }
    );


  }

  deleteSpecificCatrItem(id: string, itemId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.delete(`${environment.baseUrl}Cart/RemoveFromCart?BuyerId=${id}&ItemId=${itemId}`,

      {
        headers
        // responseType: 'text' as 'json' // 👈
      }

    )
  }

  UpdateProductQuantity(id: string, itemId: string, quantity: number): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.put(`${environment.baseUrl}Cart/UpdateToCart?BuyerId=${id}&ItemId=${itemId}&Quantity=${quantity}`,
      {},

      {
        headers

      }

    )
  }

  ClearCart(id: string): Observable<any> {
    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.delete(`${environment.baseUrl}Cart/EmptyCart?BuyerId=${id}`,
      {
        headers
      }

    )
  }
}
