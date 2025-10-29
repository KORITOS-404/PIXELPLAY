import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Nosotros } from './pages/nosotros/nosotros';
import { Categorias } from './pages/categorias/categorias';
import { Carrito } from './pages/carrito/carrito';

  export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path:'login',component:Login},
    {path:'register',component:Register},
    {path: 'nosotros',component:Nosotros},
    {path: 'categorias',component:Categorias},
    {path:'carrito',component:Carrito}
  ];
