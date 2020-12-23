import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public isLoggedIn = false;
    private role: string = '';
    private isAdmin;
    private actualUserId: number;
    private username: string;
    //private helper = new JwtHelperService();
  
    constructor(private http: HttpClient) { }

    recieveUser(): Observable<User[]> {
        return this.http.get<User[]>("http://localhost:3000/users");
      }
    
    signUp(formValue: any) {
      return this.http.post("http://localhost:3000/users", formValue);
    }
    
    isAuthenticated() {
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
    }
    
      login(user: User) {
        this.actualUserId = Number(user.id);
        this.isLoggedIn = true;
        localStorage.setItem('isLogedIn', JSON.stringify(this.isLoggedIn));
        localStorage.setItem('userId', JSON.stringify(user.id));
        localStorage.setItem('username', JSON.stringify(user.firstName));
        localStorage.setItem('role', JSON.stringify(user.role));
      }
    
      logout() {
        this.actualUserId = null;
        this.isLoggedIn = false;
        localStorage.removeItem('isLogedIn');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('role');
      }
    
      getState(): boolean {
        if(localStorage.getItem('isLogedIn') == null) {
          this.isLoggedIn = false;
        } else {
          this.isLoggedIn = JSON.parse(localStorage.getItem('isLogedIn'));
        }
        return this.isLoggedIn;
      } 
    
      getRole(){
        if(localStorage.getItem('role') === null) {
          return;
        } else {
          this.role = JSON.parse(localStorage.getItem('role'));
        }
        return this.role;
      }

      getAdmin():boolean {
          if(localStorage.getItem('isAdmin') == null) {
            this.isAdmin = false;
          } else {
            this.isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
          }
          return this.isAdmin;
      }
    
      deleteUserFromDB(user: any): Observable<void> {
        return this.http.delete<void>(`http://localhost:3000/users/${user.id}`);
      }
    
      updateUser(user: any) {
        return this.http.put<any>(`http://localhost:3000/users/${user.id}`, user);
      }
    
      getActualUserId() {
        this.actualUserId = JSON.parse(localStorage.getItem('userId'));
        if (this.getActualUserId !== null)
            return this.actualUserId;
    }
    
    getUserName() {
        this.username = JSON.parse(localStorage.getItem('username'));
        return this.username;
    }
    
    isEmailUnique(email: String){
        return this.http.get(`http://localhost:8787/users/email/${email}`);
    }
}