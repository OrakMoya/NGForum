import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { catchError, EMPTY } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule, CardComponent, InputComponent, RouterLink],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  error = "";

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  })

  constructor() { }

  handleSubmit() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) return;

    this.authService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    )
      .pipe(
        catchError(response => {
          this.error = response.error.email;
          return EMPTY;
        })
      )
      .subscribe(() => this.router.navigate(["/"]));

  }

}
