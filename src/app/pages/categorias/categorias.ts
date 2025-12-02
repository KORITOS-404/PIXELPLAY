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

  ngOnInit(): void {
  }

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

  // Función para agregar productos al carrito
  addToCart(event: Event): void {
    const button = event.target as HTMLElement;
    const productCard = button.closest('.product-card');
    
    if (productCard) {
      // Extraer información del producto del DOM
      const titleElement = productCard.querySelector('.product-title');
      const priceElement = productCard.querySelector('.product-price');
      const imageElement = productCard.querySelector('img');
      
      const productName = titleElement?.textContent || 'Producto';
      const productPrice = priceElement?.textContent || 'S/ 0.00';
      const productImage = imageElement?.getAttribute('src') || '';
      
      // Convertir precio a número
      const precio = parseFloat(productPrice.replace('S/', '').trim());
      
      // Agregar al servicio
      this.cartService.addItem({
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
  }

  // Cerrar modal
  closeModal(): void {
    this.showModal = false;
  }
}
