import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _HttpClient: HttpClient) { }


  addAddressProfile(id: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.post(`${environment.baseUrl}api/Adresses/AddAddress?UserId=${id}`,

      {
        headers,
        // responseType: 'text' as 'json' // 👈
      }
    );

  }
  pay(integrationId: string, userId: string, id: string): Observable<any> {
    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.post(
      `${environment.baseUrl}api/Payment/start?integrationId=${integrationId}&userId=${userId}&addressID=${id}`,
      {}, // لو مفيش body
      { headers } // ← لازم هنا
    );
  }



  getAddressProfile(id: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}api/Adresses/GetUserAddresses?UserId=${id}`,

      {
        headers,
        // responseType: 'text' as 'json' // 👈
      }
    );

  }




  addAddress(userId: string, body: any, headers: HttpHeaders) {
    return this._HttpClient.post(`${environment.baseUrl}api/Adresses/AddAddress?UserId=${userId}`, body, { headers });
  }


}
