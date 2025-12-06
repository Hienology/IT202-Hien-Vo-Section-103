import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})

export class HttpService {
  private baseUrl: string = 'http://localhost:3000/api';

  constructor() {}

  async get(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`);
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || `HTTP Error: ${response.status}`);
      }
      
      return data.data || data;
    } catch (error) {
      console.error('GET request failed:', error);
      throw error;
    }
  }

  async post(endpoint: string, data: any): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      
      if (!response.ok || !result.success) {
        throw new Error(result.error || `HTTP Error: ${response.status}`);
      }
      
      return result.data || result;
    } catch (error) {
      console.error('POST request failed:', error);
      throw error;
    }
  }
}
