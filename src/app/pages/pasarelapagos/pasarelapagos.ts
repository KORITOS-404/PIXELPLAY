import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { PedidoService } from '../../services/pedido.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-pasarelapagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pasarelapagos.html',
  styleUrls: ['./pasarelapagos.css']
})
export class Pasarelapagos implements OnInit {
  private cartService = inject(CartService);
  private pedidoService = inject(PedidoService);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Acceder al total y items del carrito
  total = this.cartService.total;
  items = this.cartService.items;

  // Detectar si está logueado
  isLoggedIn = false;
  usuarioLogueado: any = null;

  // Estado del formulario
  formData = {
    // Datos del cliente
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    
    // Datos de pago
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    paymentMethod: ''
  };

  // Estado del pago
  isProcessing = false;
  paymentSuccess = false;
  paymentError = false;
  errorMessage = '';
  paidAmount: number | null = null;
  orderNumber = '';

  ngOnInit(): void {
    // Verificar si el usuario está logueado
    this.isLoggedIn = this.authService.isAuthenticated();
    
    if (this.isLoggedIn) {
      this.usuarioLogueado = this.authService.getUserData();
      this.autocompletarDatos();
    }
  }

  // Autocompletar datos del usuario logueado
  private autocompletarDatos(): void {
    if (this.usuarioLogueado) {
      this.formData.nombre = this.usuarioLogueado.nombre || '';
      this.formData.apellido = this.usuarioLogueado.apellido || '';
      this.formData.correo = this.usuarioLogueado.correo || '';
      this.formData.telefono = this.usuarioLogueado.telefono || '';
      this.formData.direccion = this.usuarioLogueado.direccion || '';
    }
  }

  // Detectar tipo de tarjeta
  detectCardType(cardNumber: string): string {
    const digits = cardNumber.replace(/\s/g, '');
    
    if (/^4/.test(digits)) return 'visa';
    if (/^5[1-5]/.test(digits)) return 'mastercard';
    if (/^3[47]/.test(digits)) return 'amex';
    if (/^6(?:011|5)/.test(digits)) return 'discover';
    
    return '';
  }

  // Procesar pago (CONECTADO AL BACKEND)
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

    // Preparar datos para enviar al backend
    const pedidoData = {
      cliente: `${this.formData.nombre} ${this.formData.apellido}`,
      correo: this.formData.correo,
      telefono: this.formData.telefono,
      direccion: `${this.formData.direccion}`,
      metodoPago: this.formData.paymentMethod.toUpperCase(),
      productos: this.cartService.items().map(item => ({
        idProducto: parseInt(item.id) || 1,
        nombreProducto: item.nombre,
        imagenProducto: item.imagen,
        cantidad: item.cantidad,
        precioUnitario: item.precio
      })),
      montoTotal: this.cartService.total(),
      idUsuario: this.isLoggedIn ? this.usuarioLogueado?.idUsuario : null
    };

    // Enviar al backend
    this.isProcessing = true;
    this.paymentError = false;

    this.pedidoService.crearPedidoDesdeCarrito(pedidoData).subscribe({
      next: (response) => {
        // Pago exitoso
        this.orderNumber = response.numeroPedido;
        this.paidAmount = response.montoTotal;
        this.paymentSuccess = true;
        this.isProcessing = false;

        // Limpiar carrito
        setTimeout(() => {
          this.cartService.clearCart();
          // Redirigir a home después de 8 segundos
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 8000);
        }, 2000);
      },
      error: (error) => {
        // Error en el pago
        this.paymentError = true;
        this.errorMessage = error.error || 'Error al procesar el pago. Intenta nuevamente.';
        this.isProcessing = false;
        console.error('Error al crear pedido:', error);
      }
    });
  }

  // Validar formulario
  private validateForm(): boolean {
    const { nombre, apellido, correo, telefono, direccion, 
            cardName, cardNumber, expiry, cvv, paymentMethod } = this.formData;
    
    // Validar datos del cliente
    if (!nombre.trim() || !apellido.trim() || !correo.trim() || 
        !telefono.trim() || !direccion.trim())  {
      this.errorMessage = 'Por favor completa todos los datos de contacto.';
      return false;
    }

    // Validar email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      this.errorMessage = 'Correo electrónico inválido.';
      return false;
    }

    // Validar teléfono (9 dígitos)
    if (!/^\d{9}$/.test(telefono)) {
      this.errorMessage = 'Teléfono inválido (debe tener 9 dígitos).';
      return false;
    }

    // Validar datos de pago
    if (!cardName.trim() || !cardNumber.trim() || !expiry || !cvv || !paymentMethod) {
      this.errorMessage = 'Por favor completa todos los datos de pago.';
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
