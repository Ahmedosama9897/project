import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly _HttpClient = inject(HttpClient);
  private readonly _Router = inject(Router);


  userData: any = null;


  setregisterForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}Auth/signin`, data)
  }


  setloginForm(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}Auth/login`, data)
  }


  saveUserData(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      const decoded = jwtDecode(token);
      console.log('🔍 Decoded Token:', decoded); // ✅ اطبعه هنا
      this.userData = decoded;
    }
  }



  logOut(): void {
    localStorage.removeItem('welcomeShown'); // ✅ امسحها علشان تشتغل تاني بعد تسجيل الدخول

    localStorage.removeItem('userToken');
    this.userData = null;
    this._Router.navigate(['/login'])
  }




  // setEmailverify(data:object):Observable<any>{
  //   return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
  // }




  // setCodeverify(data:object):Observable<any>{
  //   return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
  // }


  sendOTP(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}Auth/SendOTP`, data);
  }

  verifyOtpAndResetPassword(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}Auth/VerifyOTPAndResetPassword`, data);
  }




  setResetpassword(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }








}
