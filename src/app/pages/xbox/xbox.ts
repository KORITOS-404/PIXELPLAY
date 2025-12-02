import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-xbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './xbox.html',
  styleUrls: ['./xbox.css']
})
export class XboxComponent {
  // Inyectar el servicio del carrito
  cartService = inject(CartService);

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
