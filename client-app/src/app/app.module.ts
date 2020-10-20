import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { PostsComponent } from './posts/posts.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSliderModule } from '@angular/material/slider';
// import { MatToolbarModule  } from  '@angular/material/toolbar';
// import { MatIconModule } from  '@angular/material/icon';
// import { MatSidenavModule } from  '@angular/material/sidenav';
// import { MatListModule } from  '@angular/material/list';
// import { MatButtonModule } from  '@angular/material/button';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InputMaskModule} from 'primeng/inputmask';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { LoginComponent } from './components/account/login/login.component';
import { ApiAccountService } from './core/api.account.service';
import { ApiService } from './core/api.service';
import { RegisterComponent } from './components/account/register/register.component';
import { TokenInterceptor } from './core/interceptor';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ListUserComponent } from './components/user/list-user/list-user.component';
import { ResetpasswordComponent } from './components/user/resetpassword/resetpassword.component';
import { AuthGuard } from './core/auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    PostsComponent,
    LoginComponent,
    RegisterComponent,
    AddUserComponent,
    EditUserComponent,
    ListUserComponent,
    ResetpasswordComponent,
    // ,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    InputMaskModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
    // MatToolbarModule,
    // MatSidenavModule,
    // MatListModule,
    // MatButtonModule,
    // MatIconModule
  ],
  providers: [ApiAccountService, ApiService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi : true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
