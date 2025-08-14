import { Routes } from '@angular/router';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';
import { App } from './app';
import { maintenanceGuard } from './core/guards/maintenace.guard';
import { MainLayoutComponent } from './core/layout/main-layout/main-layout';

export const routes: Routes = [

  {
    path: 'auth',
    canMatch: [noAuthGuard],
    loadChildren: () => import('./features/auth/presentation/routes').then(m => m.authRoutes)
  },

  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      { path: 'productos', loadChildren: () => import('./features/restaurantes/presentation/restaurante.routes').then(m => m.restauranteRoutes) },
      { path: '', pathMatch: 'full', redirectTo: 'productos' },

    ]
  },

  { 
    path: 'maintenance', 
    canMatch: [maintenanceGuard],
    loadComponent: () => import('./features/maintenance/presentation/maintenance/maintenance').then(m => m.Maintenance) },

  { path: '', pathMatch: 'full', redirectTo: 'productos' },
  { path: '**', redirectTo: 'productos' }
];