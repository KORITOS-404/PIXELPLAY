import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-pasarelapagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pasarelapagos.html',
  styleUrls: ['./pasarelapagos.css']
})
export class Pasarelapagos {
  private cartService = inject(CartService);
  private router = inject(Router);

  // Acceder al total del carrito
  total = this.cartService.total;

  // Estado del formulario
  formData = {
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: '',
    email: ''
  };

  // Estado del pago
  isProcessing = false;
  paymentSuccess = false;
  paymentError = false;
  errorMessage = '';
  // Monto pagado (capturado al momento del pago exitoso)
  paidAmount: number | null = null;

  // Procesar pago
  processPayment(event: Event): void {
    event.preventDefault();

    // Validar que el carrito no esté vacío
    if (this.cartService.total() === 0) {
      this.paymentError = true;
      this.errorMessage = 'El carrito está vacío. Agrega productos antes de pagar.';
      return;
    }

    // Validar datos del formulario
    if (!this.validateForm()) {
      this.paymentError = true;
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return;
    }

    // Simular procesamiento de pago
    this.isProcessing = true;
    this.paymentError = false;

    // Simular delay de procesamiento
    setTimeout(() => {
      // Simular pago exitoso (90% de éxito)
      if (Math.random() > 0.1) {
        // Capturar monto pagado antes de limpiar el carrito
        this.paidAmount = this.cartService.total();
        this.paymentSuccess = true;
        this.isProcessing = false;

        // Limpiar carrito después de mostrar el recibo
        setTimeout(() => {
          this.cartService.clearCart();
          // Redirigir a home después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 3000);
        }, 2000);
      } else {
        // Simular fallo ocasional
        this.paymentError = true;
        this.errorMessage = 'Error en el procesamiento. Intenta nuevamente.';
        this.isProcessing = false;
      }
    }, 2500);
  }

  // Validar formulario
  private validateForm(): boolean {
    const { cardName, cardNumber, expiry, cvv, paymentMethod, email } = this.formData;
    
    if (!cardName.trim() || !cardNumber.trim() || !expiry || !cvv || !paymentMethod || !email.trim()) {
      return false;
    }

    // Validar número de tarjeta (16 dígitos)
    const cardDigits = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardDigits)) {
      return false;
    }

    // Validar CVV (3-4 dígitos)
    if (!/^\d{3,4}$/.test(cvv)) {
      return false;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return false;
    }

    return true;
  }

  // Formatear número de tarjeta
  formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
  }

  // Manejar cambios en el input de tarjeta
  onCardNumberChange(event: any): void {
    this.formData.cardNumber = this.formatCardNumber(event.target.value);
  }

  // Regresar al carrito
  goBackToCart(): void {
    this.router.navigate(['/carrito']);
  }
}
