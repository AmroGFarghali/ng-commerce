import { Component, inject } from '@angular/core';
import { Api } from '../../services/api';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductModel } from '../../models/Products.model';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-women',
  standalone: true,
  template: `<div class="mt-25 pb-10 px-6">
    <main
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto gap-6"
    >
      @for (product of products(); track product.id) {
      <app-product-card [product]="product" />
      }
    </main>
  </div>`,
  imports: [ProductCard],
})
export class Women {
  private readonly ProductsService = inject(Api);
  private readonly productCategory = "women's clothing";

  products = toSignal(this.ProductsService.getProducts(this.productCategory), {
    initialValue: [] as ProductModel[],
  });
}
