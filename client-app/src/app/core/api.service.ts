import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) { }

  baseUrl = 'http://localhost:5000/api/users';

  getUsers() {
    return this.http.get<User[]>(this.baseUrl);
  }
}
