import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, timeout } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken:string,
    email:string,
    refreshToken:string,
    expiresIn:string,
    localId:string,
    registered?:boolean

}
@Injectable({providedIn: 'root'})
export class AuthService {

    user=new BehaviorSubject<User>(null);
    errorMessage:string="Unkown error occured!";
    tokenExpirationTimer:any;

    constructor(private http:HttpClient,private router:Router) { }

    signUp(email:string,password:string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5KzWKRz-Sz6bc2SGu-DeEeav2Wdrw-pg',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(resData=> {
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }))
    }

    login(email:string,password:string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5KzWKRz-Sz6bc2SGu-DeEeav2Wdrw-pg',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(this.handleError),tap(resData=>{
            this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
        }));
    }

    handleAuthentication(email:string,userId:string,token:string,expiresIn:number) {
        const user= new User(email,userId,token,new Date(new Date().getTime()+ +expiresIn*1000));
        this.user.next(user);
        this.autoLogout(expiresIn*1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }

    handleError(errorRes:HttpErrorResponse) {
        
        if(!errorRes.error || !errorRes.error.error) {
            return throwError(this.errorMessage);
            
        }
        
        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                this.errorMessage='This email already exist';
                break;
            case 'EMAIL_NOT_FOUND':
                this.errorMessage='Email not found!';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                this.errorMessage='Invalid password!';
                break;
        }
        return throwError(this.errorMessage);
        
    }

    autoLogin() {
        const userData:{
            email:string,
            id:string,
            _token:string,
            _tokenExpirationData:Date
        }=JSON.parse(localStorage.getItem('userData'));
        if(!userData) {
            return;
        }
        const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationData));
        if(!loadedUser.token) {
            return;
        }
        if(loadedUser.token) {
            this.user.next(loadedUser);
            const expierationTime=new Date(userData._tokenExpirationData).getTime()-new Date().getTime();
            this.autoLogout(expierationTime);
        }
    }

    //Logout
    logOut() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    autoLogout(expireTime:number) {
        this.tokenExpirationTimer=setTimeout(()=>{
            this.logOut();
        },expireTime)
    }
}