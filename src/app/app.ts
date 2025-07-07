import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { themeChange } from 'theme-change';
import { MobileHeaderDropdown } from './components/header/mobile-header-dropdown';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MobileHeaderDropdown],
  template: ` <app-mobile-header-dropdown /> <router-outlet /> `,
})
export class App {
  protected title = 'ng-spacetagram';
  ngOnInit(): void {
    themeChange(false);
  }
}
