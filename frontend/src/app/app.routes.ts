import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '', component: HomeComponent, title: 'Posts - NGForum'
  },
  {
    path: 'login', component: UserLoginComponent, title: 'Login - NGForum'
  },
  {
    path: 'register', component: UserRegisterComponent, title: 'Register - NGForum'
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [authGuard],
    title: 'Profile - NGForum'
  }
];
