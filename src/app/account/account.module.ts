import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { routing } from './account.routing';
import { UserAuthServiceService } from '../shared/services/user-auth-service.service';
import { FieldErrorDisplayComponent } from 'src/app/field-error-display/field-error-display.component';


@NgModule({
  imports: [
    CommonModule,ReactiveFormsModule,routing
  ],
  declarations: [RegistrationFormComponent, LoginFormComponent, HomeComponent, FieldErrorDisplayComponent],
  providers:    [ UserAuthServiceService ]
})
export class AccountModule { }
