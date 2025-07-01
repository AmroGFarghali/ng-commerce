import { Injectable, signal, WritableSignal } from '@angular/core';

import { ProductModel } from '../models/Products.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartLocalStorageService {
  shoppingCart = signal<ProductModel[]>(this.loadItems());

  saveItemToCart(item: ProductModel): void {
    const newItem = { ...item, quantity: 1 };
    this.shoppingCart.update((items) => [...items, newItem]);
    this.saveCart();
  }

  removeItemFromCart(itemId: number): void {
    this.shoppingCart.update((items) =>
      items.filter((item) => item.id !== itemId)
    );
    this.saveCart();
  }

  checkIfItemExistsInCart(itemId: number): boolean {
    return this.shoppingCart().some((item) => item.id === itemId);
  }
  private saveCart(): void {
    localStorage.setItem(
      'favouriteProducts',
      JSON.stringify(this.shoppingCart())
    );
  }
  private loadItems() {
    const data = localStorage.getItem('shoppingCart');
    return data ? JSON.parse(data) : [];
  }
}
