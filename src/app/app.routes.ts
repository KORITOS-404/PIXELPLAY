import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Nosotros } from './pages/nosotros/nosotros';
import { CartComponent } from './pages/carrito/carrito';
import { CategoriasComponent } from './pages/categorias/categorias';
import { PcCardsComponent } from './pages/pc-cards/pc-cards';
import { Ps5Component } from './pages/ps5/ps5';
import { XboxComponent } from './pages/xbox/xbox';
import { NintendoComponent } from './pages/nintendo/nintendo';
import { adminGuard } from './guards/admin.guard';
import { Pasarelapagos } from './pages/pasarelapagos/pasarelapagos';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'nosotros', component: Nosotros },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'pc-cards', component: PcCardsComponent },
  { path: 'ps5', component: Ps5Component },
  { path: 'xbox', component: XboxComponent },
  { path: 'nintendo', component: NintendoComponent },
  { path: 'carrito', component: CartComponent },
  { path :'pasarelapagos',component: Pasarelapagos},
  // Rutas de recuperar contraseña
  { 
    path: 'recuperar-email',
    loadComponent: () => import('./pages/recuperar-email/recuperar-email')
      .then(m => m.RecuperarEmail)
  },
  { 
    path: 'recuperar-codigo',
    loadComponent: () => import('./pages/recuperar-codigo/recuperar-codigo')
      .then(m => m.RecuperarCodigo)
  },
  { 
    path: 'recuperar-nueva-password',
    loadComponent: () => import('./pages/recuperar-nueva-password/recuperar-nueva-password')
      .then(m => m.RecuperarNuevaPassword)
  },

  // ✅ RUTAS ADMIN PROTEGIDAS
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./pages/crud-principal/crud-principal').then(m => m.CrudPrincipal),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/crud-dashboard/crud-dashboard').then(m => m.CrudDashboard)
      },
      {
        path: 'charts',
        loadComponent: () => import('./pages/crud-metricas/crud-metricas').then(m => m.CrudMetricas)
      },
      {
        path: 'usuarios',
        loadComponent: () => import('./pages/crud-usuarios/crud-usuarios').then(m => m.CrudUsuarios)
      },
      {
        path: 'productos',
        loadComponent: () => import('./pages/crud-dashboard/crud-dashboard').then(m => m.CrudDashboard)
      },
      {
        path: 'pedidos',
        loadComponent: () => import('./pages/crud-pedidos/crud-pedidos').then(m => m.CrudPedidos)
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }
    ]
  },
  
  // Ruta por defecto
  { path: '**', redirectTo: '/home' }
];
