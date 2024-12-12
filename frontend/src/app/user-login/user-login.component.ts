import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  router = inject(Router);
  authService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(""),
    password: new FormControl("")
  })

  constructor() { }

  handleSubmit() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) return;

    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .pipe(
        catchError(error => {
          console.log(error);
          return EMPTY;
        })
      )
      .subscribe(() => this.router.navigate(["/"]));

  }

}
