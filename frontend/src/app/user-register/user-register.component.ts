import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { catchError, EMPTY } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule, CardComponent, InputComponent],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  router = inject(Router);
  authService = inject(AuthService);

  registerForm = new FormGroup({
    display_name: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(5)]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    password_confirmation: new FormControl('', [Validators.required, Validators.minLength(5)])
  });

  constructor() {

  }

  handleSubmit() {
    this.authService.register({
      username: this.registerForm.value.username ?? "",
      display_name: this.registerForm.value.display_name ?? "",
      email: this.registerForm.value.email ?? "",
      password: this.registerForm.value.password ?? "",
      password_confirmation: this.registerForm.value.password_confirmation ?? ""
    })
      .pipe(
        catchError(e => {
          console.log(e);
          return EMPTY;
        })
      )
      .subscribe(
        () => {
          this.router.navigate(["/"])
        }
      );
  }
}
