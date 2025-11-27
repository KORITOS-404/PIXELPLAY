import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pc-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pc-cards.html',
  styleUrls: ['./pc-cards.css']
})
export class PcCardsComponent {
  pcGames = [
    {
      id: 1,
      nombre: 'Balatro',
      precio: 14.99,
      imagen: '/balatro.png',
      descripcion: 'Un roguelike de póker adictivo',
      badge: 'NUEVO'
    },
    {
      id: 2,
      nombre: 'Cuphead',
      precio: 19.99,
      imagen: '/cuphead.png',
      descripcion: 'Acción clásica de dibujos animados',
      badge: 'TOP'
    },
    {
      id: 3,
      nombre: 'Hollow Knight',
      precio: 14.99,
      imagen: '/hollowknight.png',
      descripcion: 'Aventura metroidvania épica',
      badge: 'EXCLUSIVO'
    },
    {
      id: 4,
      nombre: 'Omori',
      precio: 19.99,
      imagen: '/Omori_cover.jpg',
      descripcion: 'RPG psicológico emocional',
      badge: 'NUEVO'
    },
    {
      id: 5,
      nombre: 'Hades',
      precio: 24.99,
      imagen: '/hades.jpg',
      descripcion: 'Roguelike de acción mitológico',
      badge: 'TOP'
    },
    {
      id: 6,
      nombre: 'Celeste',
      precio: 19.99,
      imagen: '/celeste.png',
      descripcion: 'Plataformas desafiante e inspirador',
      badge: 'TOP'
    }
  ];

  showModal = false;
  addedProduct = { name: '', price: '', image: '' };
  cart: any[] = [];
  cartCount = 0;

  agregarAlCarrito(juego: any): void {
    // Agregar al carrito
    this.cart.push(juego);
    this.cartCount++;

    // Configurar producto para mostrar en modal
    this.addedProduct = {
      name: juego.nombre.toUpperCase(),
      price: `S/ ${juego.precio}`,
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
