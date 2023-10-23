import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
  getCount(): number {
    let count = this.cartService.getCount();
    return count > 0 ? count : 0;
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
