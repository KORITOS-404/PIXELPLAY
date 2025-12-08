import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css'],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class CategoriasComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void { }

  // Función para controlar el scroll del carrusel
  scrollCarousel(category: string, direction: 'left' | 'right'): void {
    const carousel = document.getElementById(`${category}-carousel`);
    if (!carousel) return;

    const scrollAmount = 320;
    const currentScroll = carousel.scrollLeft;
    
    if (direction === 'left') {
      carousel.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      carousel.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  // ✅ Versión NUEVA: recibe directamente los datos del producto
  addToCart(productId: number, productName: string, productPrice: string, productImage: string): void {
    const precio = parseFloat(productPrice.replace('S/', '').trim());

    this.cartService.addItem({
      id: productId,     // ✅ aquí va el idProducto real
      nombre: productName,
      precio: precio,
      imagen: productImage
    });

    this.addedProduct = {
      name: productName,
      price: productPrice,
      image: productImage
    };

    this.showModal = true;

    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  // Cerrar modal
  closeModal(): void {
    this.showModal = false;
  }
}
