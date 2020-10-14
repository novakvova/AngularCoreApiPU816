import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserEdit, UserEditModel } from 'src/app/model/user.model';
import { ApiService } from '../../../core/api.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editForm: FormGroup;
  invalidError = '';

  id: number;
  user: UserEdit;
  model: UserEditModel;

  public imagePath;
  imgURL: any;
  public message: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private formBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.editForm = this.formBuilder.group({
      phone: ['', Validators.required],
      age: ['', Validators.required]
    });


    this.user = new UserEdit();
    this.id = this.route.snapshot.params['id'];
    console.log('id', this.id);

    this.apiService.getUser(this.id)
      .subscribe(data=> {
        console.log("--edit responce---", data);
        this.user = data;
        this.editForm.controls['phone'].setValue(this.user.phone);
        this.editForm.controls['age'].setValue(this.user.age);
      }, error => console.log(error));

    // this.employeeService.getEmployee(this.id)
    // .subscribe(data => {
    //   console.log(data)
    //   this.employee = data;
    // }, error => console.log(error));

  }

  onSubmit() {
    console.log("-----OnSubmit form-------", this.editForm.controls);
    if(!this.imgURL)
    {
      this.message = "Обери фотку --).";
      return;
    }
    this.message="";
    if(this.editForm.invalid)
    {
      this.invalidError = 'Form not valid';
      console.log(this.invalidError);
      return;
    }

    this.model = {
      id:  this.user.id,
      age: this.editForm.controls.age.value,
      phone: this.editForm.controls.phone.value,
      imageBase64: this.imgURL
    };

    this.apiService.updateUser(this.model)
    .subscribe(data => {
      console.log(data);
      //this.employee = new Employee();
      this.router.navigate(['/']);
    }, error => console.log(error));
    // //console.log("Register data: ", this.model);
    // //baseUrl: String = 'http://localhost:5000/api/account/';

    // this.http.post<ApiLoginResponse>( 'http://localhost:5000/api/account/register',
    //       this.model).subscribe(
    //         data => {
    //           console.log("----kapusta----", data.token);
    //             this.router.navigate(['/']);
    //           // }
    //        },
    //        badReasponse => {
    //         console.log('----error-----', badReasponse.error);
    //         this.invalidError = badReasponse.error.invalid;
    //       });
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
