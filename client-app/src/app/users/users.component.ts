import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../core/api.service';
import { User } from '../model/user.model';
import { ModalService } from '../core/modal.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: User[];
  editedUser: User = new User()
  

  constructor(private router: Router,
     private apiService: ApiService,
     private modalService: ModalService) { }

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


  deleteUser(user: User){
    console.log('delete user');
    
    this.apiService.deleteUser(user.id).subscribe(responce => {
      console.log(responce);
    });
    this.ngOnInit()
    
  }

  editUser(user: User){
    this.editedUser = user
    this.openModal('user-edit-modal')
    console.log('mode');
    
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
