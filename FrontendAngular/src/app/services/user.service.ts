import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _registerUserUrl = "http://localhost:3000/user/subscribe";
  private _connectUserUrl = "http://localhost:3000/user/login";
  private _logoutUserUrl = "http://localhost:3000/user/logout";

  constructor(private http: HttpClient) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUserUrl,user);
  }
  connectUser(user) {
    return this.http.post<any>(this._connectUserUrl,user);
  }

  logoutUser(token){
    return this.http.post<any>(this._logoutUserUrl,token);
  }
}
