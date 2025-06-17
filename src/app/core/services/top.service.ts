import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopService {


  constructor(private _HttpClient: HttpClient) { }




  getTopRated(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Top/TopRated`,

      {
        headers
      });



  }
  getTopSold(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Top/TopSold`,

      {
        headers
      });



  }
  getTrending(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Top/Trending`,

      {
        headers
      });



  }
  getMostViewed(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Top/MostViewed`,

      {
        headers
      });



  }
}
