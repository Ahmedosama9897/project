import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, effect, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  WishNumber: WritableSignal<number> = signal(0);

  userId: WritableSignal<string> = signal('1')


  constructor(private _HttpClient: HttpClient) {

    // effect(() => {

    // if(this.WishNumber() > 0){
    //   document.body.style.backgroundColor = 'red'
    // }


    // effect(() =>{
    //   if(this.cartNumber() > 2){
    //     document.body.style.backgroundColor ='red'
    //   }
    // })

    // })

  }


  userwishList: string[] = []
  addProductToWish(id: string, itemid: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.post(
      `${environment.baseUrl}Wishlist/AddProduct?BuyerId=${id}&ItemId=${itemid}`,
      { headers }
    );
  }





  getProductWish(id: string): Observable<any> {
    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(`${environment.baseUrl}Wishlist/GetUserProducts?UserId=${id}`,
      {
        headers
      }

    )
  }


  deleteSpecificWishItem(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,

    )
  }






}
