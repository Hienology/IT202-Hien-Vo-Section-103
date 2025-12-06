import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html'
})
export class ProductListComponent implements OnInit {
  products: any[] = [];

  constructor(private productService: ProductService, private router: Router) { }

  async ngOnInit() {
    try {
      this.products = await this.productService.getProducts() as any[];
    } catch (error) {
      console.error("Error loading products:", error);
    }
  }

  async onBuy(product: any) {
    try {
      await this.productService.selectProduct(product);
      this.router.navigate(['/review']);
    } catch (error) {
      alert("Error selecting product. Is the server running?");
    }
  }
}