import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly storageKey = 'ttm-theme';
  private themeSubject = new BehaviorSubject<Theme>('dark');

  theme$ = this.themeSubject.asObservable();

  constructor(@Inject(DOCUMENT) private document: Document) {

    const saved = (localStorage.getItem(this.storageKey) as Theme) || 'dark';
    this.setTheme(saved);
  }

  get currentTheme(): Theme {
    return this.themeSubject.value;
  }

  setTheme(theme: Theme): void {
    this.themeSubject.next(theme);
    localStorage.setItem(this.storageKey, theme);

    this.document.documentElement.setAttribute('data-theme', theme);
  }

  toggleTheme(): void {
    this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
  }
}
