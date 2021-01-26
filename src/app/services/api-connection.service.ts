import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { checkUserValues } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  constructor(private http: HttpClient) { }

  logIn(userValues: checkUserValues) {
    const PostUrl = 'api/Membership/Login/';
    return this.http.post(PostUrl, userValues);
  }

  getPackages(userName: string) {
    userName = sessionStorage.getItem('user');
    const GetUrl = 'api/packages/getPending?username=' + userName;
    return this.http.get(GetUrl);
  }

}
