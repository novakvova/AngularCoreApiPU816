import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginModel} from '../../../model/api.login';
import { ApiAccountService } from '../../../core/api.account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  //isSubmitted = false;
  model: LoginModel;
  invalidLogin = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiAccountService
              ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("-----OnSubmit form-------", this.loginForm.controls);
    if(this.loginForm.invalid)
    {
      console.log("Form not valid");
      return;
    }
    //this.isSubmitted = true;

    this.model = {
      email: this.loginForm.controls.email.value,
      password: this.loginForm.controls.password.value
    };
    console.log("Login data: ", this.model);

   this.apiService.login(this.model).subscribe(
      data => {
        console.log("----kapusta----", data.token);
         // console.log('-----result server by login----', data.result.token);
          window.localStorage.setItem('token', data.token);
          this.router.navigate(['/']);
     },
     badReasponse => {
      // this.error = badReasponse.error;
      console.log('----error-----', badReasponse.error);
      this.invalidLogin = badReasponse.error.invalid;
      // alert(badReasponse.error);
    });

    //this.router.navigate(['/']);

  }

}
