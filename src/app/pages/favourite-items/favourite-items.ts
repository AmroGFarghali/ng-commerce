import { Component, computed, inject, signal } from '@angular/core';
import { Api } from '../../services/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductModel } from '../../models/Products.model';
import { ProductCard } from '../../components/product-card/product-card';
import { FavouriteItemsStoreService } from '../../services/favourite-items-storage.service';

@Component({
  selector: 'app-favourite-items',
  standalone: true,
  template: `<div class="mt-5 pb-10 px-6">
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
