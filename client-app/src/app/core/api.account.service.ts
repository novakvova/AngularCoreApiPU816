import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/index';
import {ApiResponse} from '../model/api.response';
import {LoginModel} from '../model/api.login';

@Injectable()
export class ApiAccountService {

  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5000/api/account/';

  login(model: LoginModel): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(this.baseUrl + 'login', model);
  }
}
