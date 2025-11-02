import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const userRole = authService.getUserRole();

  if (userRole === 'ADMIN') {
    return true;
  } else {
    console.log('⛔ Acceso denegado: Se requiere rol ADMIN');
    router.navigate(['/home']);
    return false;
  }
};
