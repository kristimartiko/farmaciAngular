import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

 @Injectable({
    providedIn: 'root'
})

export class AdminGuard implements CanActivate {

    constructor(private authService: AuthService, 
        private router: Router,
        private snackBar: MatSnackBar) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  Observable<boolean> | Promise<boolean> | boolean {
        if(this.authService.getAdmin()) {
            return true;
        } else {
            this.snackBar.open("You are not an admin!", "", {
                duration: 3000
            });
            this.router.navigate(['/home']);
            return false;
        }
    }

}