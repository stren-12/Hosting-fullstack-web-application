import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


import { Product } from './models/Product';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private http_client: HttpClient;
  constructor(private http:HttpClient) {
    this.http_client = http;
  }

  getProducts() :Observable<Product[]>{
    return this.http_client.get<Product[]>('/assets/data.json');
  }

}
