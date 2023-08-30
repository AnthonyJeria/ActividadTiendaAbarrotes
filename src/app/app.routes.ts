import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'vista-trabajador',
    loadComponent: () => import('./vista-trabajador/vista-trabajador.page').then( m => m.VistaTrabajadorPage)
  },
  {
    path: 'vista-admin',
    loadComponent: () => import('./vista-admin/vista-admin.page').then( m => m.VistaAdminPage)
  },
];
