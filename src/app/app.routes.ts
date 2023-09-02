import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'vista-alumno',
    loadComponent: () => import('./vista-alumno/vista-alumno.page').then( m => m.VistaAlumnoPage)
  },
  {
    path: 'vista-profe',
    loadComponent: () => import('./vista-profe/vista-profe.page').then( m => m.VistaProfePage)
  },

];
