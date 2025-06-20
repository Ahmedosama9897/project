import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectFiltersServicesService {

  constructor() { }

  private readonly _HttpClient = inject(HttpClient);







  GetSubCategoryBrands(id: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Brand/GetSpecificBrand?id=${id}`,
      { headers }
    );
  }

  GetAllSubCategoryByCat(id: string): Observable<any> {
    const token = localStorage.getItem('userToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this._HttpClient.get(
      `${environment.baseUrl}Category/GetSubCategoryByCategory?categoryId=${id}`,
      { headers }
    );
  }
}
