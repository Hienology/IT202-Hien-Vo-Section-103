import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs'; 

@Injectable({ providedIn: 'root' })
export class HttpService {
  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  async get(endpoint) {
    return await lastValueFrom(this.http.get(`${this.baseUrl}${endpoint}`));
  }

  async post(endpoint, data) {
    return await lastValueFrom(this.http.post(`${this.baseUrl}${endpoint}`, data));
  }
}