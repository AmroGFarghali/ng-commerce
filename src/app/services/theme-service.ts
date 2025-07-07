import { DOCUMENT, inject, Injectable, signal } from '@angular/core';
export type Theme = 'dark' | 'light';
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly currentTheme = signal<Theme>('light');
  constructor() {
    this.setTheme(this.getThemeFromLocalStorage());
  }
  getCurrentTheme() {
    return this.currentTheme.asReadonly();
  }
  setTheme(theme: Theme) {
    this.document.documentElement.setAttribute('data-theme', theme);
    this.currentTheme.set(theme);
    this.setThemeInLocalStorage(theme);
  }
  toggleTheme() {
    this.currentTheme() === 'light'
      ? this.setTheme('dark')
      : this.setTheme('light');
  }

  private setThemeInLocalStorage(theme: Theme) {
    localStorage.setItem('ng_e_commerce_theme', theme);
  }

  private getThemeFromLocalStorage() {
    return (localStorage.getItem('ng_e_commerce_theme') as Theme) ?? 'light';
  }
}
