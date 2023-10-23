import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  Products: Product[] = [];
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe({
      next: (data: Product[]) => {
        console.log(data);
        this.Products = data;
        this.productService.saveProductCache(data);
      },
      complete: () => {
        console.log('completed');
      },
      error: (error: Error) => {
        console.log('message', error.message);
        console.log('error', error.name);
      },
    });
  }

  addToCart(id: number) {
    this.cartService.addToCart(id);
  }
}
