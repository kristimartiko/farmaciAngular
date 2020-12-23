import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CartService } from 'src/app/cart/cart.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService,
    private cartService: CartService,
    private router: Router) {}

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'role': new FormControl('user')
    });
  }

  onSubmit() {
    if(this.signUpForm.valid) {
    this.authService.recieveUser().subscribe((userResponse) => {
      if(userResponse.filter(user => user.email === this.signUpForm.value.email).length) {
      }
      else {
        this.authService.signUp(this.signUpForm.value).subscribe((responseData: User) => {
          console.log(responseData);
          this.signUpForm.reset();
        })
      }
    })
    }
  }

}
