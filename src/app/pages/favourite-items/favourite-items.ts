import { Component, computed, inject, signal } from '@angular/core';
import { Api } from '../../services/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductModel } from '../../models/Products.model';
import { ProductCard } from '../../components/product-card/product-card';
import { FavouriteItemsStoreService } from '../../services/favourite-items-storage.service';

@Component({
  selector: 'app-favourite-items',
  standalone: true,
  template: `<div class="mt-25 pb-10 px-6">
    <h1 class="max-w-7xl mx-auto font-bold text-xl uppercase mb-10">
      Your favourite Items
    </h1>
    @if (favouriteProducts().length ===0) {
    <div class="mt-15 text-center text-gray-500 text-2xl space-y-2">
      <h2>You currently have no favourited items</h2>
    </div>
    }

    <main
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto gap-6"
    >
      @for (product of favouriteProducts(); track product.id) {
      <app-product-card [product]="product" />
      }
    </main>
  </div>`,
  imports: [ProductCard],
})
export class FavouriteItems {
  private readonly FavouriteProductsLocalStorageService = inject(
    FavouriteItemsStoreService
  );
  favouriteProducts =
    this.FavouriteProductsLocalStorageService.favouriteProducts;
}
