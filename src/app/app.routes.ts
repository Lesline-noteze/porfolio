import { Routes } from '@angular/router';

import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'accueil',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: Home
  },
  {
    path: 'about',
    component: Home
  },
  {
    path: 'skills',
    component: Home
  },
  {
    path: 'projects',
    component: Home
  },
  {
    path: 'experience',
    component: Home
  },
  {
    path: 'contact',
    component: Home
  },
  {
    path: '**',
    redirectTo: 'accueil'
  }
];