import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ps5',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ps5.html',
  styleUrls: ['./ps5.css']
})
export class Ps5Component {
  ps5Games = [
    {
      id: 1,
      nombre: 'Persona 5 Royal',
      precio: 59.99,
      imagen: '/persona5.jpg',
      descripcion: 'JRPG estilizado de los Phantom Thieves',
      badge: 'EXCLUSIVO'
    },
    {
      id: 2,
      nombre: 'The Evil Within',
      precio: 19.99,
      imagen: '/evilwithin.jpg',
      descripcion: 'Horror de supervivencia intenso',
      badge: 'TOP'
    },
    {
      id: 3,
      nombre: 'Ghost of Tsushima',
      precio: 49.99,
      imagen: '/ghostoftsushima.jpg',
      descripcion: 'Aventura samurái en Japón feudal',
      badge: 'EXCLUSIVO'
    },
    {
      id: 4,
      nombre: 'Spider-Man 2',
      precio: 69.99,
      imagen: '/spiderman2.avif',
      descripcion: 'Nueva aventura del héroe arácnido',
      badge: 'NUEVO'
    },
    {
      id: 5,
      nombre: 'Ratchet & Clank',
      precio: 59.99,
      imagen: '/ratchetandclank.jpg',
      descripcion: 'Acción y plataformas interdimensional',
      badge: 'EXCLUSIVO'
    },
    {
      id: 6,
      nombre: 'Demon\'s Souls',
      precio: 69.99,
      imagen: '/demonssouls.jpg',
      descripcion: 'Remake del clásico souls-like',
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
