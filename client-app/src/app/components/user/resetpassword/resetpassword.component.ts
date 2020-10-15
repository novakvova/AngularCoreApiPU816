import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ApiAccountService } from '../../../core/api.account.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {

  forgotForm: FormGroup;
  //isSubmitted = false;
  invalidLogin = '';
  successSendMessage = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private apiService: ApiAccountService
              ) { }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("-----OnSubmit form-------", this.forgotForm.controls);
    if(this.forgotForm.invalid)
    {
      console.log("Form not valid");
      return;
    }
    //this.isSubmitted = true;

    var email= this.forgotForm.controls.email.value;

    console.log("Forgot data: ", email);

   this.apiService.resetpassword(email).subscribe(
      data => {
        this.successSendMessage = "На вашу електронну пошту було надіслано повідомлення";
        //this.router.navigate(['/']);
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
