import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  name: string;

  constructor(private router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.name = this.authService.getUserName();
  }

  onNavigate() {
    this.router.navigate(['/products']);
  }

}
