import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email: string | undefined;
  password: string | undefined;

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.authService.login(loginData).subscribe(
      (token) => {
        console.log('Login successful');
        this.authService.setToken(token); 
        this.router.navigate(['/home']); 
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }
}
