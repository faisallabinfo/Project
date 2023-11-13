import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, take } from "rxjs/operators";


export const authGuard:CanActivateFn=(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<boolean|UrlTree> => {
    const router = inject(Router);
    const authServiec = inject(AuthService);
        return authServiec.user.pipe(
            take(1),
            map(user=>{
            const isAuth = !!user;
            if(isAuth) {
                return true;
            }
            return router.createUrlTree(['/auth']);
        }))
}