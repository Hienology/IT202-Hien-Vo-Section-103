import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs'; 

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) { }

  async get(endpoint) {
    console.log(`[HTTP GET] Requesting: ${this.baseUrl}${endpoint}`);
    const response = await lastValueFrom(this.http.get(`${this.baseUrl}${endpoint}`));
    console.log(`[HTTP GET] Response from ${endpoint}:`, response);
    return response;
  }

  async post(endpoint, data) {
    console.log(`[HTTP POST] Requesting: ${this.baseUrl}${endpoint}`);
    console.log(`[HTTP POST] Payload:`, data);
    const response = await lastValueFrom(this.http.post(`${this.baseUrl}${endpoint}`, data));
    console.log(`[HTTP POST] Response from ${endpoint}:`, response);
    return response;
  }
}