import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private _HttpClient: HttpClient) { }


  getUserProfile(id: string): Observable<any> {


    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}api/Profile/GetUserProfile?id=${id}`,

      {
        headers,
        // responseType: 'text' as 'json' // 👈
      }
    );

  }
}
