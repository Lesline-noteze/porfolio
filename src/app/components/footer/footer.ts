import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  currentYear = new Date().getFullYear();

  navLinks = [
    { label: 'Accueil', href: '#accueil' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact' }
  ];

  socialLinks = [
    { label: 'GitHub', href: 'https://github.com/Lesline-noteze', short: 'GH' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lesline-noteze-83b178403', short: 'in' }
  ];
}