import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient: HttpClient) { }




  getAllBrand(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Brand/GetAllBrands`,

      {
        headers
      });



  }

  getSpecificBrand(id: string): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Brand/GetSpecificBrand?id=${id}`,

      {
        headers
      });



  }

}
