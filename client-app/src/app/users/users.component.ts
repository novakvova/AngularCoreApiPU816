import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    if (!window.localStorage.getItem('token')) {
      this.router.navigate(['login']);
      return;
    }

    this.apiService.getUsers()
                      .subscribe(responce => {
                        //console.log("Users:", responce);
                        this.users = responce;
                      });
  }

}
