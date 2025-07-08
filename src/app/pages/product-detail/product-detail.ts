import { Component, computed, inject, Signal, signal } from '@angular/core';
import { ProductModel } from '../../models/Products.model';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Api } from '../../services/api';
import { ProductCard } from '../../components/product-card/product-card';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FavouriteItemsStoreService } from '../../services/favourite-items-storage.service';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [ProductCard, CurrencyPipe, CommonModule],
  template: `<div class="mt-25 pb-10 px-6">
    <main class="max-w-7xl mx-auto gap-6">
      <div
        class="flex justify-end border-y mb-10 py-2 border-base-300 gap-2 items-center"
      >
        <button
          data-tip="Favourite"
          [ngClass]="
            isFavourited()
              ? 'text-primary btn btn-soft btn-primary btn-sm tooltip '
              : 'btn btn-soft relative btn-sm tooltip '
          "
          (click)="toggleFavouriteItem()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5"
          >
            <path
              d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z"
            />
          </svg>
        </button>
        <button
          [disabled]="isFirstItem()"
          (click)="goToPreviousProduct()"
          class="btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5"
          >
            <path
              fill-rule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <button
          [disabled]="isLastItem()"
          (click)="goToNextItem()"
          class="btn btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-5"
          >
            <path
              fill-rule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>

      <div class="flex flex-col lg:flex lg:flex-row gap-x-15">
        <figure class="lg:min-w-[500px] lg:max-w-[400px] pb-4 md:pb-0">
          <img
            [src]="product()?.image"
            alt=""
            class="w-full h-[500px] object-fit"
          />
        </figure>
        <div class="space-y-5">
          <h2 class="text-2xl font-bold ">{{ product()?.title }}</h2>
          <p class="text-2xl font-semibold font-sans">
            {{ product()?.price | currency }}
          </p>
          <p class="mt-2">
            {{ product()?.description }}
          </p>
          <div class="badge badge-outline capitalize">
            {{ product()?.category }}
          </div>
          <button
            [disabled]="checkItemAlreadyExist()"
            (click)="cartLocalStorageService.saveItemToCart(product()!)"
            class="btn btn-primary w-full transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6"
            >
              <path
                d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
              />
            </svg>

            Add To Cart
          </button>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold mt-20 mb-10">Other Similar Products</h2>
        <section
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-6"
        >
          @for (product of similarProducts(); track product.id) {
          <app-product-card [product]="product" />
          }
        </section>
      </div>
    </main>
  </div>`,
})
export class ProductDetail {
  private readonly api = inject(Api);
  private readonly http = inject(HttpClient);
  route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly favouriteItemsLocalStorageService = inject(
    FavouriteItemsStoreService
  );
  readonly cartLocalStorageService = inject(ShoppingCartLocalStorageService);

  readonly product: Signal<ProductModel | undefined>;
  readonly similarProducts: Signal<ProductModel[] | undefined>;
  readonly isFirstItem = computed(() => this.product()?.id === 1);
  readonly isLastItem = computed(() => this.product()?.id === 20);
  constructor() {
    // Fetch the main product
    const product$ = this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('productId')!),
      switchMap((id) =>
        this.http.get<ProductModel>('https://fakestoreapi.com/products/' + id)
      )
    );
    this.product = toSignal(product$, { initialValue: undefined });

    const similarProducts$ = product$.pipe(
      switchMap((product) =>
        this.api
          .getProducts(product.category)
          .pipe(map((items) => items.filter((item) => item.id !== product.id)))
      )
    );

    this.similarProducts = toSignal(similarProducts$, {
      initialValue: [] as ProductModel[],
    });
  }

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

  goToPreviousProduct() {
    this.router.navigate(['/products', +this.product()?.id! - 1]);
  }
  goToNextItem() {
    this.router.navigate(['/products', +this.product()?.id! + 1]);
  }
}
