import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ContactData {
  name: string;
  email: string;
  message: string;
  website: string; // honeypot anti-robot
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  send(data: ContactData) {
    // Même domaine que le site : pas de CORS à configurer
    return this.http.post<{ ok: boolean }>('/api/contact', data);
  }
}