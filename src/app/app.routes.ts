import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:"",
        redirectTo:'login',
        pathMatch:'full'
    },
      {
    path: 'login',
    loadComponent: () => import('./login-form/login-form.component').then(m => m.LoginForm)
  }
];
