import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-email',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-email.html',
  styleUrl: './recuperar-email.css'
})
export class RecuperarEmail {
  correo = '';
  mensaje = '';
  mensajeColor = '';
  loading = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  enviarCorreo(): void {
    if (!this.correo.trim()) {
      this.showMessage('Por favor ingresa un correo válido.', 'red');
      return;
    }

    this.loading = true;

    this.authService.enviarCodigoRecuperacion(this.correo).subscribe({
      next: (response) => {
        console.log('✅ Código enviado:', response);
        this.showMessage(`Código enviado a: ${this.correo}`, 'lightgreen');
        
        // Guardar correo para usar en siguiente paso
        sessionStorage.setItem('recuperar_correo', this.correo);
        
        setTimeout(() => {
          this.router.navigate(['/recuperar-codigo']);
        }, 1500);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.showMessage('Usuario no encontrado o error al enviar código', 'red');
        this.loading = false;
      }
    });
  }

  private showMessage(text: string, color: string): void {
    this.mensaje = text;
    this.mensajeColor = color;
  }
}
