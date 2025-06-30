import { Injectable, signal, WritableSignal } from '@angular/core';

import { ProductModel } from '../models/Products.model';

@Injectable({
  providedIn: 'root',
})
export class FavouriteItemsStoreService {
  favouriteProducts = signal<ProductModel[]>(this.loadItems());

  saveItemToFavourites(item: ProductModel): void {
    this.favouriteProducts.update((items) => [...items, item]);
    this.saveFavourites();
  }

  removeItemFromFavourites(itemId: number): void {
    this.favouriteProducts.update((items) =>
      items.filter((item) => item.id !== itemId)
    );
    this.saveFavourites();
  }

  checkIfItemExistsInFavourites(itemId: number): boolean {
    return this.favouriteProducts().some((item) => item.id === itemId);
  }
  private saveFavourites(): void {
    localStorage.setItem(
      'favouriteProducts',
      JSON.stringify(this.favouriteProducts())
    );
  }
  private loadItems() {
    const data = localStorage.getItem('favouriteProducts');
    return data ? JSON.parse(data) : [];
  }
}
