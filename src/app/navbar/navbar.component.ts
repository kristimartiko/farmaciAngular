import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  isLogedIn: boolean;
  admin: string;
  private username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  getLogInState(): boolean {
      this.isLogedIn = this.authService.getState();
      if(this.isLogedIn === true) {
        return true;
      } else {
        return false;
      }
  }

  navLogOut() {
    this.authService.logout();
  }

   // getUsername() {
    // return this.username = this.authService.getUserName();
    //  this.authService.getUserName();
  //}

  isAdmin1(): boolean {
    if(this.authService.getAdmin()) {
      return true;
    } else {
      return false;
    }
  }
}
