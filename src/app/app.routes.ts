import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'people' },
  {
    path: 'people',
    loadComponent: () => import('./pages/people/people').then((m) => m.People),
  },
  {
    path: 'astronaut-duties',
    loadComponent: () =>
      import('./pages/astronaut-duties/astronaut-duties').then((m) => m.AstronautDuties),
  },
];
