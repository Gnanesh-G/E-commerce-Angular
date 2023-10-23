import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { StorageService } from './storage.service';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  Cart: Cart[] = [];

  constructor(
    private productservice: ProductService,
    private storageService: StorageService,
    private authservice: AuthService
  ) {}
  getCount(): number {
    let cart: Cart[] = this.storageService.getCart();
    if (cart === null) {
      cart = [];
    }
    let loggedInUser: User = this.authservice.getLoggedInUser();

    let userCart: Cart | undefined = cart.find(
      (cart) => cart.user.id === loggedInUser.id
    );

    console.log(userCart);

    let count: number = 0;
    if (userCart) {
      for (let product of userCart.cart) {
        if (product.count) count += product.count;
      }
    }
    return count;
  }
  addToCart(productId: number): void {
    let loggedInUser: User = this.authservice.getLoggedInUser();
    console.log(loggedInUser);

    let products: Product[] = this.productservice.getLocalProducts();
    console.log(products);

    let product: Product | undefined = products.find(
      (o) => o.id === productId
    )!;
    if (product) {
      let userCart: Cart | undefined = this.Cart.find(
        (Cart) => Cart.user.id === loggedInUser.id
      );
      if (userCart) {
        let productExists: Product | undefined = userCart?.cart.find(
          (p) => p.id === productId
        );

        if (productExists) {
          let newCart: Product[] = [];
          for (let product of userCart?.cart!) {
            if (product.id === productId) {
              newCart.push({ ...product, count: product.count! + 1 });
            } else {
              newCart.push(product);
            }
          }
          userCart.cart = newCart;
          console.log('userCart', userCart);
        } else {
          userCart?.cart.push({ ...product, count: 1 });
        }
        let updatedCart: Cart[] = this.Cart.filter(
          (cart) => cart.user.id !== loggedInUser.id
        );
        updatedCart.push(userCart);
        this.storageService.setCart(updatedCart);
      } else {
        let newCart: Cart = {
          user: loggedInUser,
          cart: [{ ...product, count: 1 }],
        };
        this.Cart.push(newCart);
        console.log(newCart);

        this.storageService.setCart(this.Cart);
      }
    }
  }
  getUserCart(): Product[] {
    let loggedInUser: User = this.storageService.getLoggedInUser();
    console.log(loggedInUser);
    let cart: Cart[] = this.storageService.getCart();
    console.log(cart);
    let userCart: Product[] | undefined = cart.find(
      (cart) => cart.user.id === loggedInUser.id
    )?.cart;
    if (!userCart) userCart = [];
    return userCart;
  }
}

