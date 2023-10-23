import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Cart } from '../models/cart';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}
  users: User[] = [{ id: 1, email: 'gnanesh@users.com', password: 'gnanesh' }];
  loadUsers() {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }
  }
  getAllUsers(): User[] {
    return JSON.parse(localStorage.getItem('users')!);
  }
  addUser(user: User): User[] {
    let userId = {
      id: this.users.length + 1,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    this.users.push(userId);

    localStorage.setItem('users', JSON.stringify(this.users));
    return this.users;
  }
  setLoggedInUser(users: User): void {
    localStorage.setItem('loggedInUser', JSON.stringify(users));
  }
  removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }
  isUserLoggedIn(): boolean {
    return localStorage.getItem('loggedInUser') !== null;
  }
  getCachedProducts(): Product[] {
    let products = JSON.parse(localStorage.getItem('products') as string);
    if (products === null) {
      products = [];
    }
    return products;
  }
  getCart(): Cart[] {
    return JSON.parse(localStorage.getItem('cart') as string);
  }
  setCart(cart: Cart[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  setProducts(products: Product[]): void {
    localStorage.setItem('products', JSON.stringify(products));
  }

  getLoggedInUser(): User {
    let users = JSON.parse(localStorage.getItem('loggedInUser') as string);
    if (users === null) {
      users = [];
    }
    return users;
  }
}
