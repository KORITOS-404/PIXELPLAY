import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/auth.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isAuthenticated = false;
  userData: AuthResponse | null = null;
  menuOpen = false;
  
  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userData = user;
    });
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  // ✅ NUEVO MÉTODO
  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  
  // ✅ NUEVO MÉTODO
  goToMiCuenta(): void {
    if (this.isAdmin()) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/perfil']); // o la ruta que quieras para usuarios normales
    }
    this.closeMenu();
  }
  
  logout() {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
      this.authService.logout();
      this.menuOpen = false;
    }
  }
  
  closeMenu() {
    this.menuOpen = false;
  }
}
