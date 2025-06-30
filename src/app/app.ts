import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { themeChange } from 'theme-change';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header],
  template: ` <app-header /> <router-outlet /> `,
})
export class App {
  protected title = 'ng-spacetagram';
  ngOnInit(): void {
    themeChange(false);
  }
}
