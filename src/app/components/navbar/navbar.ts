import {
  Component,
  DOCUMENT,
  inject,
  signal
} from '@angular/core';

import {
  Router,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  private document = inject(DOCUMENT);
  private router = inject(Router);

  menuOpen = signal(false);
  isDarkMode = signal(true);

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
      this.isDarkMode.set(false);
      this.document.documentElement.classList.add('light-theme');
    } else {
      this.isDarkMode.set(true);
      this.document.documentElement.classList.remove('light-theme');
    }
  }

  navigateTo(section: string): void {
    this.menuOpen.set(false);

    this.router.navigate([section]).then(() => {
      setTimeout(() => {
        const element = this.document.getElementById(section);

        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 100);
    });
  }

  toggleMenu(): void {
    this.menuOpen.update(open => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  toggleTheme(): void {
    const dark = !this.isDarkMode();

    this.isDarkMode.set(dark);

    if (dark) {
      this.document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}