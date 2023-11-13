import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs-compat';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  
  isLoginMode=true;
  isLoading=false;
  authObs=new Observable<AuthResponseData>();
  errorMessage:string;

  constructor(private authService:AuthService,private router:Router,private activatedRoute:ActivatedRoute){}
  onSwitchMode() {
    this.isLoginMode=!this.isLoginMode;
  }
  onAuth(authForm:NgForm) {
    if(!authForm.valid) {
      return;
    }
    if(!this.isLoginMode) {

      this.isLoading=true;
      this.authService.signUp(authForm.value.email,authForm.value.password).subscribe(
        resData=>{
          if(resData) {
            this.isLoading=false;
            this.router.navigate(['/recipes'],{relativeTo:this.activatedRoute});
          }
        },error=>{
          this.errorMessage=error;
          this.isLoading=false;
        }
      );
      
    }
    else {
      this.isLoading=true;
      this.authService.login(authForm.value.email,authForm.value.password).subscribe(
        resData=> {
          if(resData.registered===true) {
            this.isLoading=false;
            this.router.navigate(['/recipes'],{relativeTo:this.activatedRoute});
          }
        },
        (error) => {
          this.errorMessage=error;
          this.isLoading=false;
        }
      );
    }    
  }

  onCloseAlert() {
    this.errorMessage=null;
  }
}

