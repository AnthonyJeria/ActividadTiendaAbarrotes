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
  },  {
    path: 'recupera-clave',
    loadComponent: () => import('./page/recupera-clave/recupera-clave.page').then( m => m.RecuperaClavePage)
  },
  {
    path: 'vista-alumno',
    loadComponent: () => import('./page/vista-alumno/vista-alumno.page').then( m => m.VistaAlumnoPage)
  },


];
