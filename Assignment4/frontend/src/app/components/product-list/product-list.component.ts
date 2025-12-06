import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  loading: boolean = false;
  error: string = '';

  constructor(
    private productService: ProductService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    this.loading = true;
    
    try {
      this.products = await this.productService.getProducts();
      this.loading = false;
      this.error = '';
    } catch (err) {
      this.error = 'Failed to load products';
      this.loading = false;
      console.error('Error loading products:', err);
    }
  }

  async onBuyNow(product: any): Promise<void> {
    try {
      // Send selected product to backend
      await this.httpService.post('select-product', { productId: product.id });
      
      // Navigate to order review page
      this.router.navigate(['/order-review']);
    } catch (err) {
      console.error('Failed to select product:', err);
      alert('Failed to select product. Please try again.');
    }
  }
}
