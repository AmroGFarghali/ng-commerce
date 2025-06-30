import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from '../models/Products.model';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private readonly http = inject(HttpClient);
  private readonly url = 'https://fakestoreapi.com/products';
  getProducts(category?: string): Observable<ProductModel[]> {
    return category
      ? this.http.get<ProductModel[]>(this.url + `/category/${category}`)
      : this.http.get<ProductModel[]>(this.url);
  }

  constructor() {}
}
