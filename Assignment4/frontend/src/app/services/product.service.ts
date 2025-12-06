import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private httpService: HttpService) { }

  getProducts() {
    return this.httpService.get('/products');
  }

  selectProduct(product) {
    return this.httpService.post('/select-product', product);
  }

  getSelectedProduct() {
    return this.httpService.get('/selected-product');
  }

  submitOrder(data) {
    return this.httpService.post('/submit-order', data);
  }
}