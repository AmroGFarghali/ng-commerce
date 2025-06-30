import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Men } from './pages/men/men';
import { Women } from './pages/women/women';
import { Jewelery } from './pages/jewelry/jewelry';
import { FavouriteItems } from './pages/favourite-items/favourite-items';
import { ShoppingCart } from './pages/shopping-cart/shopping-cart';
import { Electronics } from './pages/electronics/electronics';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'men', component: Men },
  { path: 'women', component: Women },
  { path: 'jewelry', component: Jewelery },
  { path: 'electronics', component: Electronics },
  { path: 'favourite-items', component: FavouriteItems },
  { path: 'shopping-cart', component: ShoppingCart },
];
