import { Component, OnInit } from '@angular/core';
import { UserRegistrationModel } from '../../_interfaces/UserRegistrationModel';
import { UserAuthServiceService } from '../../shared/services/user-auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {

  UserregisterForm: FormGroup;
  errors: string;  
  isRequesting: boolean;
  submitted: boolean = false;

  constructor(private fb: FormBuilder, private UserAuthService : UserAuthServiceService,private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.UserregisterForm = this.fb.group({  
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),Validators.maxLength(12)]],
      location:  ['', Validators.required]
      });  


  }

  get f() { return this.UserregisterForm.controls; }

  isFieldValid(field: string) {
    return (
      (!this.UserregisterForm.get(field).valid && this.UserregisterForm.get(field).touched) ||
      (this.UserregisterForm.get(field).untouched && this.UserregisterForm)
    );
  }

  displayFieldCss(field: string) {
    return {
      'has-error': this.isFieldValid(field),
      'has-feedback': this.isFieldValid(field)
    };
  }




  registerUser(UserregisterForm) {
    this.submitted = false;
    this.isRequesting = true;
    this.errors='';
//     if(this.UserregisterForm.valid)
//     {
//         // this.UserAuthService.register(apiAddress,value)
//         //           //.finally(() => this.isRequesting = false)
//         //           .subscribe(
//         //             result  => {if(result){
//         //                 this.router.navigate(['/login'],{queryParams: {brandNew: true,email:value.email}});                         
//         //             }},
//         //             errors =>  this.errors = errors);


//     }else 
//     {

//     }      

this.submitted = true;
 
// stop here if form is invalid
if (this.UserregisterForm.invalid) {
    return;
}
else  {
        this.UserAuthService.register(this.UserregisterForm.value)
            .pipe(first())
            .subscribe(
                data => {
//                     this.alertService.success('Registration successful', true);
                      this.toastr.success('User Registered Succcessfully.', 'User Registered');
//                     this.router.navigate(['/login']);
                },
                error => {
//                     this.alertService.error(error);
                      this.toastr.error('There is some issue in saving records, please contact to system administrator!', 'Product Updated');
//                     this.loading = false;
                });

}



}
}
