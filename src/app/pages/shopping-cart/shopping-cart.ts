import {
  Component,
  computed,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { ShoppingCartLocalStorageService } from '../../services/shopping-cart-local-storage.service';
import { CurrencyPipe } from '@angular/common';
import { ShoppingItemCard } from '../../components/shopping-cart-item/shopping-card';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  standalone: true,
  imports: [CurrencyPipe, ShoppingItemCard, FormsModule],
  template: `
    <div
      class="flex flex-col-reverse lg:flex-row min-h-full gap-x-20 gap-y-20 mt-25"
    >
      <div class="w-full px-12 lg:pt-11 lg:pl-16  ">
        <form (ngSubmit)="handleSubmit()" #userForm="ngForm">
          <div>
            <h2 class="font-bold text-xl uppercase">Payment Detail</h2>
            <p>Complete your order by providing your payment details please</p>
          </div>

          <fieldset class="mt-10 mb-5">
            <legend class="font-semibold text-lg uppercase">
              Shipping address
            </legend>
            <textarea class="textarea w-full" placeholder="Address"></textarea>
          </fieldset>

          <fieldset class="space-y-4">
            <legend class="font-semibold text-lg uppercase">
              Payment Method
            </legend>
            <div class="space-y-2">
              <label for="card" class="fieldset-label text-sm"
                >Card Number</label
              >
              <input
                ngModel
                name="cardNumber"
                id="card"
                type="tel"
                class="input validator w-full "
                required
                pattern="[0-9]*"
                minlength="16"
                maxlength="16"
              />
            </div>
            <div class="flex gap-4">
              <div class="space-y-2 w-full">
                <label for="expiry" class="fieldset-label text-sm"
                  >Expiration Date</label
                >
                <input
                  ngModel
                  name="expiry"
                  id="expiry"
                  class="input validator w-full"
                  required
                  pattern="(0[1-9]|1[0-2])/([0-9]{2})"
                />
              </div>
              <div class="space-y-2 w-full">
                <label for="cvv" class="fieldset-label text-sm">CVV</label>
                <input
                  ngModel
                  name="cvv"
                  id="cvv"
                  class="input validator w-full "
                  required
                  pattern="^[0-9]{3,4}$"
                />
              </div>
            </div>
            <div class="space-y-2 w-full">
              <label for="nameOnCard" class="fieldset-label text-sm"
                >Name on card</label
              >
              <input
                id="nameOnCard"
                ngModel
                name="fullName"
                class="input validator w-full "
                required
                type="text"
              />
            </div>
          </fieldset>

          <div class="mt-6 flex gap-2 w-full border-b border-b-base-300 pb-7">
            <input type="checkbox" checked="checked" class="checkbox" />
            <p>Remember payment information</p>
            <div
              data-tip="This data is saved on your end only and isnt shared anywhere else"
              class="ml-auto tooltip"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="size-6 "
              >
                <path
                  fill-rule="evenodd"
                  d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001c2.996 0 5.718-1.17 7.734-3.08ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75ZM12 15a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75H12Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <div class="space-y-2 font-normal">
            <div class="flex ">
              <p>Total Quantity</p>
              <span class="ml-auto font-bold">{{ cartQuantity() }}</span>
            </div>
            <div class="flex  ">
              <p>Total Amount</p>
              <span class="ml-auto font-bold"
                >{{ totalAmount() | currency }}
              </span>
            </div>
          </div>

          <button
            type="submit"
            class="btn btn-primary w-full mt-4"
            [disabled]="userForm.invalid || cartQuantity() === 0"
          >
            Pay {{ totalAmount() | currency }}
          </button>
        </form>
      </div>

      <div class="w-full px-12 lg:pt-11 lg:pl-16">
        <h3 class="uppercase text-xl font-bold">Summary Order</h3>
        <p class="mb-2">
          Here is your cart, please confirm these are the items you would like
          to purchase.
        </p>
        @if (cart().length===0) {
        <div class="mt-15 text-center text-gray-500 text-2xl space-y-2">
          <h2>Please add some items to see your order</h2>
          <button (click)="router.navigate(['/'])" class="btn btn-info">
            Continue Shopping
          </button>
        </div>

        } @else{
        <div
          class="w-full max-h-[41rem] space-y-4 border rounded-md overflow-y-auto p-4"
        >
          @for (item of cart(); track item.id) {
          <div class="border-b last:pb-0 last:border-b-0 pb-5">
            <app-shopping-item-card [product]="item" />
          </div>
          }
        </div>
        }
      </div>
    </div>

    <dialog #confirmation_modal id="confirmation_modal" class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Confirmation</h3>
        <p class="py-4">
          Are you sure you would like to go through with this payment?
        </p>
        <div class="modal-action">
          <form class="flex gap-2" method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Cancel</button>
            <button
              class="btn btn-primary"
              (click)="handleConfirm()"
              type="submit"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </dialog>
  `,
})
export class ShoppingCart {
  @ViewChild('confirmation_modal') myDialog!: ElementRef<HTMLDialogElement>;
  readonly router = inject(Router);
  private readonly shoppingCartLocalStorageService = inject(
    ShoppingCartLocalStorageService
  );
  cart = this.shoppingCartLocalStorageService.shoppingCart;
  cartQuantity = this.shoppingCartLocalStorageService.cartQuantity;
  totalAmount = computed(() =>
    this.cart().reduce(
      (prevTotal, item) => prevTotal + item?.quantity! * item?.price,
      0
    )
  );

  handleSubmit() {
    // this.shoppingCartLocalStorageService.clearItems();
    this.openModal();
  }

  openModal() {
    if (this.myDialog) {
      this.myDialog.nativeElement.showModal();
    }
  }

  handleConfirm() {
    this.shoppingCartLocalStorageService.clearItems();
    this.router.navigate(['/']);
  }
  closeModal() {
    if (this.myDialog) {
      this.myDialog.nativeElement.close();
    }
  }
}
