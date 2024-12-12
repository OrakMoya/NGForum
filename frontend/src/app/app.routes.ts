import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';

export const routes: Routes = [
  {
    path:'', component: HomeComponent
  },
  {
    path:'login', component: UserLoginComponent
  },
  {
    path: 'register', component: UserRegisterComponent
  }
];
