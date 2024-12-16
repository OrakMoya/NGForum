import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavButtonComponent } from '../nav-button/nav-button.component';

@Component({
  selector: 'app-navigation',
  imports: [NavButtonComponent, RouterLink],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  authService = inject(AuthService);
}
