import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {RegisterModel} from '../../../model/api.login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiLoginResponse } from 'src/app/model/api.login.response';
import { Constants } from '../../../constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  invalidError = '';
  model: RegisterModel;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      //confirmPassword: ['', Validators.required]
    });
  }
  onSubmit() {
    console.log("-----OnSubmit form-------", this.registerForm.controls);
    if(!this.imgURL)
    {
      this.message = "Обери фотку --).";
      return;
    }
    this.message="";
    if(this.registerForm.invalid)
    {
      this.invalidError = 'Form not valid';
      console.log(this.invalidError);
      return;
    }

    this.model = {
      email: this.registerForm.controls.email.value,
      phone: this.registerForm.controls.phone.value,
      imageBase64: this.imgURL,
      password: this.registerForm.controls.password.value
    };

    //console.log("Register data: ", this.model);
    //baseUrl: String = 'http://localhost:5000/api/account/';

    this.http.post<ApiLoginResponse>(`${Constants.HOME_URL}/api/account/register`,
          this.model).subscribe(
            data => {
              //console.log("----kapusta----", data.token);
                this.router.navigate(['/']);
              // }
           },
           badReasponse => {
            console.log('----error-----', badReasponse.error);
            this.invalidError = badReasponse.error.invalid;
          });
  }


  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.message="";
    }
  }

}
