import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  contactInfo = [
    {
      icon: '✉',
      label: 'Email',
      value: 'leslinenoteze@gmail.com',
      href: 'mailto:leslinenoteze@gmail.com',
      external: false
    },
    {
      icon: 'GH',
      label: 'GitHub',
      value: 'github.com/Lesline-noteze',
      href: 'https://github.com/Lesline-noteze',
      external: true
    },
    {
      icon: 'in',
      label: 'LinkedIn',
      value: 'Mon profil LinkedIn',
      href: 'https://www.linkedin.com/in/lesline-noteze-83b178403',
      external: true
    }
  ];

}