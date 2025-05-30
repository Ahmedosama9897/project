import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  private readonly _HttpClient = inject(HttpClient)

  Addtocomparison(ItemId: string, buyerid: string): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Comparison/AddToComparison?ItemId=${ItemId}&BuyerId=${buyerid}`,
      {
        headers
      });







  }
}
