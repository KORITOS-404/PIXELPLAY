import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-nueva-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-nueva-password.html',
  styleUrl: './recuperar-nueva-password.css'
})
export class RecuperarNuevaPassword implements OnInit {
  nuevaPassword = '';
  confirmarPassword = '';
  mensaje = '';
  mensajeColor = '';
  loading = false;
  correo = '';
  codigo = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Recuperar correo y código de los pasos anteriores
    this.correo = sessionStorage.getItem('recuperar_correo') || '';
    this.codigo = sessionStorage.getItem('recuperar_codigo') || '';
    
    if (!this.correo || !this.codigo) {
      this.router.navigate(['/recuperar-email']);
      return;
    }
  }

  guardarPassword(): void {
    if (!this.nuevaPassword || !this.confirmarPassword) {
      this.showMessage('Por favor completa ambos campos.', 'red');
      return;
    }

    if (this.nuevaPassword.length < 6) {
      this.showMessage('La contraseña debe tener al menos 6 caracteres.', 'red');
      return;
    }

    if (this.nuevaPassword !== this.confirmarPassword) {
      this.showMessage('Las contraseñas no coinciden.', 'red');
      return;
    }

    this.loading = true;

    this.authService.cambiarPassword(this.correo, this.codigo, this.nuevaPassword).subscribe({
      next: (response) => {
        console.log('✅ Contraseña actualizada:', response);
        this.showMessage('Contraseña restablecida correctamente ✅', 'lightgreen');
        
        // Limpiar sessionStorage
        sessionStorage.removeItem('recuperar_correo');
        sessionStorage.removeItem('recuperar_codigo');
        
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.showMessage('Error al cambiar contraseña. Intenta de nuevo.', 'red');
        this.loading = false;
      }
    });
  }

  private showMessage(text: string, color: string): void {
    this.mensaje = text;
    this.mensajeColor = color;
  }
}
