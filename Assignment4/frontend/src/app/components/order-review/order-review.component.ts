import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-order-review',
  templateUrl: './order-review.component.html',
  styleUrl: './order-review.component.css'
})
export class OrderReviewComponent implements OnInit {
  selectedProduct: any = null;
  submitting: boolean = false;
  showConfirmation: boolean = false;
  orderDetails: any = null;

  constructor(
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSelectedProduct();
  }

  async loadSelectedProduct(): Promise<void> {
    try {
      this.selectedProduct = await this.httpService.get('selected-product');
    } catch (err) {
      console.error('Failed to load selected product:', err);
      this.selectedProduct = null;
    }
  }

  async submitOrder(): Promise<void> {
    if (!this.selectedProduct) {
      alert('No product selected');
      return;
    }

    this.submitting = true;

    try {
      const response = await this.httpService.post('submit-order', {});
      console.log('Order submitted successfully:', response);
      this.orderDetails = response;
      this.showConfirmation = true;
      this.submitting = false;
    } catch (err) {
      console.error('Order submission failed:', err);
      alert('Failed to submit order. Please try again.');
      this.submitting = false;
    }
  }

  backToProducts(): void {
    this.showConfirmation = false;
    this.selectedProduct = null;
    this.router.navigate(['/products']);
  }
}
