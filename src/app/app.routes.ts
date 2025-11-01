import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Nosotros } from './pages/nosotros/nosotros';
import { Carrito } from './pages/carrito/carrito';
import { CategoriasComponent } from './pages/categorias/categorias';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'nosotros', component: Nosotros },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'carrito', component: Carrito },
  
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
  
  // Ruta por defecto
  { path: '**', redirectTo: '/home' }
];
