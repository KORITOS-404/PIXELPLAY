import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule]
})
export class Home {
  // Inyectar el servicio del carrito
  cartService = inject(CartService);
  
  // Estado del modal
  showModal = false;
  addedProduct = {
    name: '',
    price: '',
    image: ''
  };

  // Usar el contador del servicio
  get cartCount() {
    return this.cartService.itemCount();
  }

  // Agregar producto al carrito usando el servicio (AHORA CON ID)
  addToCart(productId: number, productName: string, productPrice: string, productImage: string) {
    // Convertir el precio de string a número
    const precio = parseFloat(productPrice.replace('S/', '').trim());
    
    // Agregar al servicio con ID real
    this.cartService.addItem({
      id: productId,          // ✅ ID que luego usará el backend como idProducto
      nombre: productName,
      precio: precio,
      imagen: productImage
    });
    
    // Guardar información del producto agregado para el modal
    this.addedProduct = {
      name: productName,
      price: productPrice,
      image: productImage
    };
    
    // Mostrar modal
    this.showModal = true;
    
    // Ocultar modal después de 3 segundos
    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  // Cerrar modal
  closeModal() {
    this.showModal = false;
  }
}
