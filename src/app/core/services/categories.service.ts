import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }




  getAllCategories(): Observable<any> {



    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });


    return this._HttpClient.get(`${environment.baseUrl}Category/GetAllCategory`,

      {
        headers
      });



  }



  getSpecificCategories(id: string): Observable<any> {

    const token = localStorage.getItem('userToken');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(`${environment.baseUrl}Category/GetSubCategoryDetails?subCategoryId=${id}}`,
      {
        headers
      })
  }
}
