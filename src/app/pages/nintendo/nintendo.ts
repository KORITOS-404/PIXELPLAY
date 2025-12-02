import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-nintendo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nintendo.html',
  styleUrls: ['./nintendo.css']
})
export class NintendoComponent {
    // Inyectar el servicio del carrito
  cartService = inject(CartService);

  nintendoGames = [
    {
      id: 1,
      nombre: 'Super Mario Odyssey',
      precio: 59.99,
      imagen: '/mario.jpg',
      descripcion: 'Aventura 3D del fontanero más famoso',
      badge: 'EXCLUSIVO'
    },
    {
      id: 2,
      nombre: 'The Legend of Zelda: BOTW',
      precio: 59.99,
      imagen: '/zelda.jpg',
      descripcion: 'Mundo abierto épico de Hyrule',
      badge: 'TOP'
    },
    {
      id: 3,
      nombre: 'Animal Crossing',
      precio: 59.99,
      imagen: '/animalcrossing.jpg',
      descripcion: 'Vida relajante en tu propia isla',
      badge: 'TOP'
    },
    {
      id: 4,
      nombre: 'Splatoon 3',
      precio: 59.99,
      imagen: '/splatoon3.jpg',
      descripcion: 'Shooter colorido y competitivo',
      badge: 'NUEVO'
    },
    {
      id: 5,
      nombre: 'Kirby Star Allies',
      precio: 49.99,
      imagen: '/kirby.jpg',
      descripcion: 'Plataformas adorables y divertidas',
      badge: 'EXCLUSIVO'
    },
    {
      id: 6,
      nombre: 'Metroid Dread',
      precio: 59.99,
      imagen: '/metroid.jpg',
      descripcion: 'Acción metroidvania intensa',
      badge: 'TOP'
    }
  ];

 showModal = false;
  addedProduct = { name: '', price: '', image: '' };

  // Usar el contador del servicio
  get cartCount() {
    return this.cartService.itemCount();
  }

  agregarAlCarrito(juego: any): void {
    // Agregar al servicio del carrito
    this.cartService.addItem({
      id: juego.id,
      nombre: juego.nombre,
      precio: juego.precio,
      imagen: juego.imagen,
      descripcion: juego.descripcion,
      badge: juego.badge
    });

    // Configurar producto para mostrar en modal
    this.addedProduct = {
      name: juego.nombre.toUpperCase(),
      price: `S/ ${juego.precio.toFixed(2)}`,
      image: juego.imagen
    };

    // Mostrar modal
    this.showModal = true;

    // Cerrar modal automáticamente después de 3 segundos
    setTimeout(() => {
      this.showModal = false;
    }, 3000);
  }

  closeModal(): void {
    this.showModal = false;
  }
}