import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly _HttpClient = inject(HttpClient);

  getAllProducts(pagesize: number): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Products/GetFilteredProducts?newwest=true&pageSize=${pagesize}`,
      { headers }
    );
  }

  getAllProductstopsell(): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Products/GetFilteredProducts?mostSold=true`,
      { headers }
    );
  }

  getSpecificProducts(id: string | null): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Products/GetProductById?id=${id}`,
      { headers }
    );
  }

  Addview(itemid: string | null, id: number | null): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { Item_ID: itemid, Buyer_ID: id };

    return this._HttpClient.post(
      `${environment.baseUrl}Products/AddItemView`,
      body,
      { headers }
    );
  }
  AddProductReview(rating: number, comment: string, itemId: string, buyerId: number): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const params = {
      Item_ID: itemId,
      Buyer_ID: buyerId.toString(),
      Rating: rating.toString(),
      Comment: comment
    };

    return this._HttpClient.post(
      `${environment.baseUrl}Products/AddProductReview?Item_ID=${itemId}&Buyer_ID=${buyerId}&Rating=${rating}&Comment=${comment}`,
      {},
      { headers, params }
    );
  }




  getProductReviews(itemid: string | null): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Products/GetProductReviews?Item_ID=${itemid}`,
      { headers }
    );
  }


  getcheck(comment: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.post(
      `https://abusive-machine.up.railway.app/check_text`,
      { text: comment }, // ✅ هنا استخدمنا المتغير اللي استقبلناه
      { headers }
    );
  }



  getRelatedProduct(itemid: string | null): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Products/GetFilteredProducts?subCategry=${itemid}`,
      { headers }
    );
  }
}
