import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  constructor(private router: Router) {}

  // Navegación interna
  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToNosotros() {
    this.router.navigate(['/nosotros']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  // Funciones de contacto
  callPhone() {
    window.location.href = 'tel:+51999999999';
  }

  sendEmail() {
    window.location.href = 'mailto:pixelplay@gmail.com';
  }

  openLocation() {
    window.open('https://www.google.com/maps/search/?api=1&query=Av.+Bolivia+180+Lima', '_blank');
  }

  // Funciones de redes sociales
  openYouTube() {
    window.open('https://www.youtube.com/@pixelplay', '_blank');
  }

  openTikTok() {
    window.open('https://www.tiktok.com/@pixelplay', '_blank');
  }

  openFacebook() {
    window.open('https://www.facebook.com/pixelplay', '_blank');
  }

  openWhatsApp() {
    window.open('https://wa.me/51999999999', '_blank');
  }

  openDiscord() {
    window.open('https://discord.gg/pixelplay', '_blank');
  }

  // Scroll to top cuando se hace clic en el logo
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
