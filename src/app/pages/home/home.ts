import { Component, inject } from '@angular/core';
import { Api } from '../../services/api';
import { AsyncPipe, UpperCasePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductModel } from '../../models/Products.model';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductCard],
  template: `
    <div class="mt-25 pb-10 px-6">
      <main
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto gap-6 "
      >
        @for (product of products(); track product.id) {
        <app-product-card [product]="product" />
        }
      </main>
    </div>
  `,
})
export class Home {
  private readonly ProductsService = inject(Api);
  products = toSignal(this.ProductsService.getProducts(), {
    initialValue: [] as ProductModel[],
  });
}
