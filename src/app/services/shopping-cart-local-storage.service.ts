import { computed, Injectable, signal, WritableSignal } from '@angular/core';

import { ProductModel } from '../models/Products.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartLocalStorageService {
  private readonly key = 'ng_e_commerce_cart_items';

  shoppingCart = signal<ProductModel[]>(this.loadItems());
  cartQuantity = computed(() =>
    this.shoppingCart().reduce(
      (prevTotal, item) => prevTotal + item?.quantity!,
      0
    )
  );

  updateItemInCart(item: ProductModel): void {
    this.shoppingCart.update((items) =>
      items.map((i) => (i.id === item.id ? item : i))
    );
    this.saveCart();
  }

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

  checkIfItemExistsInCart(item: ProductModel): boolean {
    return this.shoppingCart().some((i) => i.id === item.id);
  }
  clearItems() {
    localStorage.removeItem(this.key);
    this.shoppingCart.set([]);
  }

  private saveCart(): void {
    localStorage.setItem(this.key, JSON.stringify(this.shoppingCart()));
  }
  private loadItems() {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }
}
