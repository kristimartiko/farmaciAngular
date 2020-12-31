import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from 'src/app/cart/cart.service';
import { MatSnackBar } from '@angular/material';
import { first, map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;
  test: any;

  constructor(private authService: AuthService,
     private router: Router,
      private cartService: CartService,
      private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.logInForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  /*onSubmit() {
   this.authService.recieveUser().subscribe((userResponse) => {
      userResponse = userResponse.filter(user => 
        user.password === this.logInForm.value.password && 
        user.email === this.logInForm.value.email);

        if(userResponse.length) {
          console.log(userResponse);
          this.authService.login(userResponse[0]);
          if(this.authService.getRole() === 'admin') {
            this.router.navigate(['/home']);
            this.snackBar.open('Successfully loged admin in as ' + this.logInForm.value.email + '!', '', {
              duration: 3000
            })
          } else {
          this.router.navigate(['/home']);
          this.snackBar.open('Succesfully loged in as '+ this.logInForm.value.email + '!', '', {
            duration: 3000
          })
        }
      }
   })
  }*/

  onSubmit() {
    this.authService.login(this.logInForm.value).subscribe(response => {
      let token = JSON.parse(JSON.stringify(response));
      console.log(response);
      localStorage.setItem('token', token.jwt);
      localStorage.setItem('name', token.firstName);
      if(this.authService.getAdmin()) {
        this.router.navigate(['/home']);
        this.snackBar.open('Successfully logged in as admin', '', {
          duration: 3000
        });
      } else {
        this.router.navigate(['/home']);
        this.snackBar.open('Successfully logged in as user', '', {
          duration: 3000
        });
      }
    });
  }

  filterUser() {
    let filteredName: string;

    this.test = this.authService.recieveUser().pipe(map(users => {
      filteredName = users.filter(u => {
        return u.role === 'user';
      })[0].firstName;
    }),
    map(() => filteredName)
    );
  }

}
