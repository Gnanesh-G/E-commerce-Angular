import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from 'src/app/models/cart';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartProducts: Product[] = [];
  total = 0;
  
  constructor(
    private cartService: CartService,
    private storage: StorageService,
    private authservice:AuthService,
    private router:Router
  ) {}
  ngOnInit(): void {
    this.cartProducts = this.cartService.getUserCart();
  }
  totalPriceCount(): number {
    return (this.total = this.cartProducts.reduce(
      (acc, cart) => acc + cart.price * cart.count,
      0
    ));
    }
  resetCart(){
    localStorage.removeItem('cartProducts')
    this.router.navigate(['/home'],{replaceUrl:true})
  }
  logout() {
    localStorage.removeItem('cart')
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
