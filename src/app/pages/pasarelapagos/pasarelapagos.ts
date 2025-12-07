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

  // Acceder al total y items del carrito
  total = this.cartService.total;
  items = this.cartService.items;

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
  paidAmount: number | null = null;
  orderNumber = '';

  // Detectar tipo de tarjeta
  detectCardType(cardNumber: string): string {
    const digits = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(digits)) return 'visa';
    if (/^5[1-5]/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    if (/^6(?:011|5)/.test(digits)) return 'discover';
    
    return '';
  }

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
      return;
    }

    // Simular procesamiento de pago
    this.isProcessing = true;
    this.paymentError = false;

    // Simular delay de procesamiento
    setTimeout(() => {
      // Simular pago exitoso (90% de éxito)
      if (Math.random() > 0.1) {
        this.orderNumber = this.generateOrderNumber();
        this.paidAmount = this.cartService.total();
        this.paymentSuccess = true;
        this.isProcessing = false;

        // Limpiar carrito después de mostrar el recibo
        setTimeout(() => {
          this.cartService.clearCart();
          // Redirigir a home después de 3 segundos
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 8000);
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
      this.errorMessage = 'Por favor completa todos los campos correctamente.';
      return false;
    }

    // Validar número de tarjeta (16 dígitos)
    const cardDigits = cardNumber.replace(/\s/g, '');
    if (!/^\d{16}$/.test(cardDigits)) {
      this.errorMessage = 'Número de tarjeta inválido (debe tener 16 dígitos).';
      return false;
    }

    // Validar CVV (3-4 dígitos)
    if (!/^\d{3,4}$/.test(cvv)) {
      this.errorMessage = 'CVV inválido (debe tener 3 o 4 dígitos).';
      return false;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      this.errorMessage = 'Correo electrónico inválido.';
      return false;
    }

    // Validar que la fecha no sea pasada
    const [year, month] = expiry.split('-').map(Number);
    const expiryDate = new Date(year, month);
    const today = new Date();
    today.setDate(1);
    today.setHours(0, 0, 0, 0);
    
    if (expiryDate < today) {
      this.errorMessage = 'La tarjeta está vencida. Usa una tarjeta válida.';
      return false;
    }

    return true;
  }

  // Generar número de orden
  private generateOrderNumber(): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `GG-${timestamp}-${random}`;
  }

  // Formatear número de tarjeta
  formatCardNumber(value: string): string {
    const digits = value.replace(/\D/g, '');
    return digits.replace(/(\d{4})(?=\d)/g, '$1 ').substring(0, 19);
  }

  // Manejar cambios en el input de tarjeta
  onCardNumberChange(event: any): void {
    this.formData.cardNumber = this.formatCardNumber(event.target.value);
    
    // Detectar y establecer tipo de tarjeta automáticamente
    const cardType = this.detectCardType(event.target.value);
    if (cardType) {
      this.formData.paymentMethod = cardType;
    }
  }

  // Regresar al carrito
  goBackToCart(): void {
    this.router.navigate(['/carrito']);
  }
}
