import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  total=0;
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }
  getLocalProducts(): Product[] {
    return this.storageService.getCachedProducts();
  }
  saveProductCache(products: Product[]) {
    this.storageService.setProducts(products);
  }
}
