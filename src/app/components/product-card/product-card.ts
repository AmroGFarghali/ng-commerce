import { Component, inject, input } from '@angular/core';
import { ProductModel } from '../../models/Products.model';
import { FavouriteItemsStoreService } from '../../services/favourite-items-storage.service';
import { CommonModule } from '@angular/common';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      class="card bg-base-100 shadow-sm w-full h-full hover:bg-base-200 transition-all"
    >
      <figure>
        <img
          [src]="product()?.image"
          alt="Shoes"
          class="w-full h-[320px] object-fill"
        />
      </figure>
      <div class="card-body">
        <h2 class="card-title">
          {{ product()?.title }}
        </h2>
        <p class="truncate mt-2">
          {{ product()?.description }}
        </p>
        <div class="card-actions flex-col gap-5 ">
          <div class="flex justify-between items-center w-full flex-wrap">
            <div class="flex items-center gap-2">
              <button
                class="btn btn-soft relative btn-sm tooltip"
                data-tip="View Detail"
                routerLink="shopping-cart"
                routerLinkActive="bg-primary text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-4"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fill-rule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
              <button
                data-tip="Favourite"
                [ngClass]="
                  isFavourited()
                    ? 'text-primary btn btn-soft btn-primary btn-sm tooltip t'
                    : 'btn btn-soft relative btn-sm tooltip '
                "
                (click)="toggleFavouriteItem()"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="size-4"
                >
                  <path
                    d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
                  />
                </svg>
              </button>
            </div>
            <div class="badge badge-outline capitalize">
              {{ product()?.category }}
            </div>
          </div>
          <button
            [disabled]="checkItemAlreadyExist()"
            (click)="cartLocalStorageService.saveItemToCart(product()!)"
            class="btn btn-primary w-full transition-all"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ProductCard {
  product = input<ProductModel | undefined>();
  private readonly favouriteItemsLocalStorageService = inject(
    FavouriteItemsStoreService
  );
  readonly cartLocalStorageService = inject(ShoppingCartLocalStorageService);

  toggleFavouriteItem() {
    if (
      this.favouriteItemsLocalStorageService.checkIfItemExistsInFavourites(
        this.product()?.id!
      )
    )
      this.favouriteItemsLocalStorageService.removeItemFromFavourites(
        this.product()?.id!
      );
    else
      this.favouriteItemsLocalStorageService.saveItemToFavourites(
        this.product()!
      );
  }

  isFavourited(): boolean {
    return this.favouriteItemsLocalStorageService.checkIfItemExistsInFavourites(
      this.product()?.id!
    );
  }
  checkItemAlreadyExist() {
    return this.cartLocalStorageService.checkIfItemExistsInCart(
      this.product()!
    );
  }
}
