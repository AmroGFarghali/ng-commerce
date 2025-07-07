import { Component, inject, input } from '@angular/core';
import { ProductModel } from '../../models/Products.model';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';

@Component({
  selector: 'app-shopping-item-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: ` <div class="flex gap-4 w-full">
    <figure>
      <img [src]="product()?.image" alt="" class="h-32 w-30 object-fill " />
    </figure>

    <div class="w-full">
      <h3 class="font-bold text-lg">Men's Cotton Jacket</h3>
      <p class="font-bold text-lg tracking-wider">
        {{ product()?.price | currency }}
      </p>

      <div class="flex gap-2 items-center w-full mt-3">
        <button (click)="decrementProductQuantity()" class="btn btn-soft">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-3"
          >
            <path
              fill-rule="evenodd"
              d="M4.25 12a.75.75 0 0 1 .75-.75h14a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
        <p class="font-semibold text-lg">{{ product()?.quantity }}</p>
        <button
          (click)="incrementProductQuantity()"
          class="btn btn-soft plus-icon"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <button (click)="removeItem()" class="btn btn-error btn-soft ml-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="size-4"
          >
            <path
              fill-rule="evenodd"
              d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>`,
})
export class ShoppingItemCard {
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );

  removeItem() {
    this.shoppingCartLocalStorageService.removeItemFromCart(
      this.product()?.id!
    );
  }
  product = input<ProductModel>();

  incrementProductQuantity() {
    const newItem: ProductModel = {
      ...this.product()!,
      quantity: this.product()?.quantity! + 1,
    };
    this.shoppingCartLocalStorageService.updateItemInCart(newItem);
  }

  decrementProductQuantity() {
    if (this.product()?.quantity === 1) {
      this.removeItem();
    } else {
      const newItem: ProductModel = {
        ...this.product()!,
        quantity: this.product()?.quantity! - 1,
      };
      this.shoppingCartLocalStorageService.updateItemInCart(newItem);
    }
  }
}
