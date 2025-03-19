import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

export const appRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent, // LayoutComponent wraps child routes
    children: [
      { path: '', redirectTo: 'messages', pathMatch: 'full' },
      {
        path: 'messages',
        loadComponent: () => import('./features/messages/messages.component').then(m => m.MessagesComponent)
      },
    ]
  }
];
