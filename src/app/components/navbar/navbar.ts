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
    // Suscribirse a cambios en el estado de autenticación
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.userData = user;
    });
  }
  
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  
  logout() {
    if (confirm('¿Estás seguro de cerrar sesión?')) {
      this.authService.logout();
      this.menuOpen = false;
    }
  }
  
  // Cerrar menú al hacer click fuera
  closeMenu() {
    this.menuOpen = false;
  }
}
