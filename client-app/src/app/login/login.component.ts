import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

interface LoginModel {
  email: string;
  password: string;
}


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  //isSubmitted = false;
  model: LoginModel;

  constructor(private formBuilder: FormBuilder) { }

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

  }

}
