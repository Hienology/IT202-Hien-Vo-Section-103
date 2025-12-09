import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  standalone: false,
  selector: 'app-order-review',
  templateUrl: './order-review.component.html'
})
export class OrderReviewComponent implements OnInit {
  selectedProduct: any = null;
  successMessage: string = "";

  constructor(private productService: ProductService, private router: Router) { }

  async ngOnInit() {
    try {
      this.selectedProduct = await this.productService.getSelectedProduct();
    } catch (error) {
      console.error("Error fetching selection:", error);
    }
  }

  async onSubmit() {
    try {
      const response: any = await this.productService.submitOrder({});
      this.successMessage = response.message;
    } catch (error) {
      alert("Order failed. Please try again.");
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}