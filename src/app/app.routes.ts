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
    path: 'recupera-clave',
    loadComponent: () => import('./page/recupera-clave/recupera-clave.page').then( m => m.RecuperaClavePage)
  },
  {
    path: 'vista-alumno',
    loadComponent: () => import('./page/vista-alumno/vista-alumno.page').then( m => m.VistaAlumnoPage)
  },  {
    path: 'login-profe',
    loadComponent: () => import('./page/login-profe/login-profe.page').then( m => m.LoginProfePage)
  },
  {
    path: 'vista-profe',
    loadComponent: () => import('./page/vista-profe/vista-profe.page').then( m => m.VistaProfePage)
  },

 


];
