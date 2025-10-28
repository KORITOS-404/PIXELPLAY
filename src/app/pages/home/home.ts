import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  styleUrl: './home.css',
  imports: [CommonModule]
})
export class Home {
  // Estado del modal
  showModal = false;
  addedProduct = {
    name: '',
    price: '',
    image: ''
  };

  // Carrito de compras
  cart: any[] = [];
  cartCount = 0;

  juegos = [
    {
      titulo: 'The Evil Within',
      precio: 150,
      imagen: '/evilwithin.jpg'
    },
    {
      titulo: 'Persona 5',
      precio: 100,
      imagen: '/persona5.jpg'
    }
  ];

  // Agregar producto al carrito
  addToCart(productName: string, productPrice: string, productImage: string) {
    // Agregar al carrito
    this.cart.push({
      name: productName,
      price: productPrice,
      image: productImage
    });
    
    // Actualizar contador
    this.cartCount = this.cart.length;
    
    // Guardar información del producto agregado
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