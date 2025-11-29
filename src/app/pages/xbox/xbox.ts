import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-xbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xbox.html',
  styleUrls: ['./xbox.css']
})
export class XboxComponent {
  xboxGames = [
    {
      id: 1,
      nombre: 'Halo Infinite',
      precio: 59.99,
      imagen: '/haloinfinite.jpg',
      descripcion: 'La épica saga de Master Chief continúa',
      badge: 'EXCLUSIVO'
    },
    {
      id: 2,
      nombre: 'Forza Horizon 5',
      precio: 59.99,
      imagen: '/forza5.jpg',
      descripcion: 'Carreras de mundo abierto en México',
      badge: 'TOP'
    },
    {
      id: 3,
      nombre: 'Gears 5',
      precio: 39.99,
      imagen: '/gears5.jpg',
      descripcion: 'Acción intensa contra la Horda',
      badge: 'EXCLUSIVO'
    },
    {
      id: 4,
      nombre: 'Starfield',
      precio: 69.99,
      imagen: '/starfield.jpg',
      descripcion: 'RPG espacial de Bethesda',
      badge: 'NUEVO'
    },
    {
      id: 5,
      nombre: 'Sea of Thieves',
      precio: 39.99,
      imagen: '/seaofthieves.jpg',
      descripcion: 'Aventuras piratas multijugador',
      badge: 'TOP'
    },
    {
      id: 6,
      nombre: 'Flight Simulator',
      precio: 59.99,
      imagen: '/flightsim.jpg',
      descripcion: 'Simulador de vuelo realista',
      badge: 'EXCLUSIVO'
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
