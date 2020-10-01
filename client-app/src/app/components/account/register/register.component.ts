import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  invalidError = '';

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private formBuilder: FormBuilder,
    private router: Router
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
