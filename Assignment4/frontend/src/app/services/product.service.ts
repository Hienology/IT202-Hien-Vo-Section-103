import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpService: HttpService) {}

  async getProducts(): Promise<any> {
    try {
      return await this.httpService.get('products');
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProduct(id: number): Promise<any> {
    try {
      return await this.httpService.get(`products/${id}`);
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error);
      throw error;
    }
  }

  async createProduct(product: any): Promise<any> {
    try {
      return await this.httpService.post('products', product);
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }
}
