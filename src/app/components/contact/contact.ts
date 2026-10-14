import { Component, inject, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { ContactData, ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly status = signal<'idle' | 'sending' | 'ok' | 'error'>('idle');
  readonly errorMessage = signal('');

  readonly form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', Validators.required],
    website: [''] // honeypot anti-robot : doit rester vide
  });

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

  submit(): void {

    if (this.status() === 'sending') {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.status.set('sending');
    this.errorMessage.set('');

    this.contactService
      .send(this.form.getRawValue() as ContactData)
      .subscribe({

        next: () => {
          this.status.set('ok');
          this.form.reset({
            name: '',
            email: '',
            message: '',
            website: ''
          });
        },

        error: (err: HttpErrorResponse) => {
          if (err.status === 429) {
            this.errorMessage.set(
              'Veuillez patienter une minute avant un nouvel envoi.'
            );
          } else if (err.status === 400) {
            this.errorMessage.set(
              'Vérifiez les informations saisies et réessayez.'
            );
          } else {
            this.errorMessage.set(
              'Une erreur est survenue. Veuillez réessayer.'
            );
          }
          this.status.set('error');
        }

      });
  }
}