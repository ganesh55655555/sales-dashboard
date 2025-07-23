import { Component } from '@angular/core';
import { SalesService } from '../sales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  alertMessage: string = '';
  alertClass: string = '';

  constructor(private router: Router, private userService: SalesService) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.showAlert('Please enter both email and password!', 'danger');
      return;
    }

    this.userService.loginUser(this.email, this.password).subscribe(
      (response) => {
        if (response && response.name) {
          localStorage.setItem('userName', response.name);
        }

        this.showAlert('Login Successful!', 'success');
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 2000);
      },
      (error) => {
        this.showAlert('Login Failed. Please check your credentials!', 'danger');
        console.error('Login failed:', error);
      }
    );
  }

  showAlert(message: string, type: string): void {
    this.alertMessage = message;
    this.alertClass = `alert alert-${type}`;
    setTimeout(() => {
      this.alertMessage = '';
    }, 3000);
  }

}
