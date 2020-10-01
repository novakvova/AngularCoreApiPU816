import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {ApiLoginResponse} from '../model/api.login.response';
import {LoginModel} from '../model/api.login';

@Injectable()
export class ApiAccountService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5000/api/account/';
  //baseUrl = 'https://klapan.tk/api/account/';
  login(model: LoginModel): Observable<ApiLoginResponse> {
    return this.http.post<ApiLoginResponse>(this.baseUrl + 'login', model);
  }
}
