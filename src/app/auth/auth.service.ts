import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public isLoggedIn = false;
    private role: string = '';
    private isAdmin;
    private actualUserId: number;
    private username: string;
    private helper = new JwtHelperService();
  
    constructor(private http: HttpClient,
      private snackBar: MatSnackBar,
      private router: Router) { }

    recieveUser(): Observable<User[]> {
        return this.http.get<User[]>("http://localhost:8787/users");
      }
    
    signUp(formValue: any) {
      return this.http.post("http://localhost:8787/users/signup", formValue);
    }

    login(formvalue: any) {
      console.log(formvalue);
        return this.http.post("http://localhost:8787/authenticate", 
      {"username": formvalue.email, "password": formvalue.password});
      
    }

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      this.snackBar.open("Successfully logged out!", "", {
        duration: 3000
      });
    }

    getState() :boolean {
      if(localStorage.getItem('token') !== null) {
        let token = localStorage.getItem('token');

        if(this.helper.isTokenExpired(token)) {
          localStorage.removeItem('token');
          localStorage.removeItem('name');
          this.snackBar.open('Session Expired!', '', {
            duration: 3000
          });
          this.router.navigate(['/login']);
          return false;
        }
        else return true;
      }
      return false;
    }

    getAdmin(): boolean {
      if(localStorage.getItem('token') !== null) {
        let token = localStorage.getItem('token');
        let tokenPayload = this.helper.decodeToken(token);
        let role = JSON.parse(JSON.stringify(tokenPayload.role[0].authority));

        if(!this.helper.isTokenExpired(token) && role == "Admin") {
          return true;
        } else return false;
      }
      return false;
    }

    getRole() {
      return this.role;
    }

    getUserName() {
      this.username = localStorage.getItem('name');
      return this.username;
  }

  deleteUserFromDB(user: any): Observable<void> {
    return this.http.delete<void>(`http://localhost:8787/users/delete/${user.id}`);
  }

  updateUser(user: any) {
    return this.http.put<any>(`http://localhost:8787/users/update/${user.id}`, user);
  }
    
    /*isAuthenticated() {
      const authObservable = Observable.create(observer => {
        observer.next(this.isLoggedIn)
      });
      return authObservable;
    }  
    
    isAdminObservable() {
      const adminObservable = Observable.create(observer => {
        observer.next(this.isAdmin)
      });
      return adminObservable;
    }*/


     /* login(user: User) {
        this.actualUserId = Number(user.id);
        this.isLoggedIn = true;
        localStorage.setItem('isLogedIn', JSON.stringify(this.isLoggedIn));
        localStorage.setItem('userId', JSON.stringify(user.id));
        localStorage.setItem('username', JSON.stringify(user.firstName));
        localStorage.setItem('role', JSON.stringify(user.role));
      }*/
    
     /* logout() {
        this.actualUserId = null;
        this.isLoggedIn = false;
        localStorage.removeItem('isLogedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
      }*/

     /*getState(): boolean {
        if(localStorage.getItem('isLogedIn') == null) {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = JSON.parse(localStorage.getItem('isLogedIn'));
        }
        return this.isLoggedIn;
      } */
    
      /*getRole(){
        if(localStorage.getItem('role') === null) {
          return;
        } else {
          this.role = JSON.parse(localStorage.getItem('role'));
        }
        return this.role;
      }*/

     /* getAdmin():boolean {
          if(localStorage.getItem('isAdmin') == null) {
            this.isAdmin = false;
          } else {
            this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
          }
          return this.isAdmin;
      }*/
    
      
    
      getActualUserId() {
        this.actualUserId = JSON.parse(localStorage.getItem('userId'));
        if (this.getActualUserId !== null)
            return this.actualUserId;
    }
    
    
    isEmailUnique(email: String){
        return this.http.get(`http://localhost:8787/users/email/${email}`);
    }

    getToken() {
      return localStorage.getItem('token');
    }
}