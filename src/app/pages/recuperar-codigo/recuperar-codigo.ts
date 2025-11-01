import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recuperar-codigo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recuperar-codigo.html',
  styleUrl: './recuperar-codigo.css'
})
export class RecuperarCodigo implements OnInit {
  codeBoxes = ['', '', '', '', '', ''];
  timer = 30;
  canResend = false;
  mensaje = '';
  mensajeColor = '';
  loading = false;
  correo = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Recuperar correo del paso anterior
    this.correo = sessionStorage.getItem('recuperar_correo') || '';
    
    if (!this.correo) {
      this.router.navigate(['/recuperar-email']);
      return;
    }
    
    this.startTimer();
  }

  validarCodigo(): void {
    const codigo = this.codeBoxes.join('');

    if (codigo.length !== 6) {
      this.showMessage('Por favor ingresa los 6 dígitos.', 'red');
      return;
    }

    this.loading = true;

    this.authService.validarCodigo(this.correo, codigo).subscribe({
      next: (response) => {
        console.log('✅ Código validado:', response);
        this.showMessage('Código validado correctamente ✅', 'lightgreen');
        
        // Guardar código para el siguiente paso
        sessionStorage.setItem('recuperar_codigo', codigo);
        
        setTimeout(() => {
          this.router.navigate(['/recuperar-nueva-password']);
        }, 1500);
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.showMessage('Código inválido o expirado', 'red');
        this.loading = false;
      }
    });
  }

  onCodeInput(index: number, event: any): void {
    const value = event.target.value;
    this.codeBoxes[index] = value.replace(/\D/g, '');

    if (value && index < 5) {
      const nextInput = document.querySelectorAll('.code-box')[index + 1] as HTMLInputElement;
      nextInput?.focus();
    }
  }

  onCodeKeydown(index: number, event: KeyboardEvent): void {
    if (event.key === 'Backspace' && !this.codeBoxes[index] && index > 0) {
      const prevInput = document.querySelectorAll('.code-box')[index - 1] as HTMLInputElement;
      prevInput?.focus();
    }
  }

  reenviarCodigo(): void {
    this.authService.enviarCodigoRecuperacion(this.correo).subscribe({
      next: (response) => {
        console.log('🔄 Código reenviado:', response);
        this.showMessage('Nuevo código enviado. Revisa tu correo.', '#9fdde5');
        this.canResend = false;
        this.timer = 30;
        this.startTimer();
      },
      error: (error) => {
        console.error('❌ Error:', error);
        this.showMessage('Error al reenviar código', 'red');
      }
    });
  }

  private startTimer(): void {
    const interval = setInterval(() => {
      this.timer--;
      if (this.timer <= 0) {
        this.canResend = true;
        clearInterval(interval);
      }
    }, 1000);
  }

  private showMessage(text: string, color: string): void {
    this.mensaje = text;
    this.mensajeColor = color;
  }
}
