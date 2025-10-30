import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Nosotros } from './pages/nosotros/nosotros';
import { Categorias } from './pages/categorias/categorias';
import { Carrito } from './pages/carrito/carrito';
import { CrudPrincipal } from './pages/crud-principal/crud-principal';
import { CrudDashboard } from './pages/crud-dashboard/crud-dashboard';
import { CrudMetricas } from './pages/crud-metricas/crud-metricas';
import { CrudUsuarios } from './pages/crud-usuarios/crud-usuarios';

  export const routes: Routes = [
    { path: '', component: Home },
    { path: 'home', component: Home },
    { path:'login',component:Login},
    {path:'register',component:Register},
    {path: 'nosotros',component:Nosotros},
    {path: 'categorias',component:Categorias},
    {path:'carrito',component:Carrito},
    {path:'admin', component:CrudPrincipal, children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: CrudDashboard },
      { path: 'charts', component: CrudMetricas },
      { path: 'usuarios', component: CrudUsuarios } 

            ]
    }
    
  ];
