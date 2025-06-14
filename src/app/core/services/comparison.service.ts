import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  private readonly _HttpClient = inject(HttpClient)

  Addtocomparison(itemId: string, buyerId: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    console.log(token);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`   // إضافة التوكن في الهيدر
    });

    return this._HttpClient.post(
      `${environment.baseUrl}Comparison/AddToComparison?ItemId=${itemId}&BuyerId=${buyerId}`,
      {},
      {
        headers,
        responseType: 'text' as 'json'
      }
    );
  }




  deleteSpecificComparisonItem(buyerId: string, itemId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.delete(`${environment.baseUrl}Comparison/RemoveFromComparisons?ItemId=${itemId}&BuyerId=${buyerId}`,

      {
        headers,
        responseType: 'text' as 'json' // 👈

      }

    )
  }

  getProductComparison(buyerId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/GetAllComparisons?BuyerId=${buyerId}`,
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }
  getProductComparisonphone(buyerId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/GetPhonesComparison?BuyerId=${buyerId}`,
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }
  getProductComparisonlabtop(buyerId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/GetLaptopsComparison?BuyerId=${buyerId}`,
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }
  getProductComparisonTvs(buyerId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/GetTVsComparison?BuyerId=${buyerId}`,
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }
  getProductComparisonPCs(buyerId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/GetPCsComparison?BuyerId=${buyerId}`,
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }
  getProductComparisonSmartWatches(buyerId: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/GetSmartWatchesComparison?BuyerId=${buyerId}`,
      {
        headers,
        responseType: 'text' as 'json' // 👈
      }
    );


  }



}
