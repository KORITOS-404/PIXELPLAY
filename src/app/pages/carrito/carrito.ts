import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class CartComponent {
  cartService = inject(CartService);
  
  items = this.cartService.items;
  itemCount = this.cartService.itemCount;
  total = this.cartService.total;

  increaseQuantity(id: string): void {
    const item = this.cartService.getItem(id);
    if (item) {
      this.cartService.updateQuantity(id, item.cantidad + 1);
    }
  }

  decreaseQuantity(id: string): void {
    const item = this.cartService.getItem(id);
    if (item) {
      this.cartService.updateQuantity(id, item.cantidad - 1);
    }
  }

  removeItem(id: string): void {
    this.cartService.removeItem(id);
  }

  clearCart(): void {
    if (confirm('¿Estás seguro de vaciar el carrito?')) {
      this.cartService.clearCart();
    }
  }

  checkout(): void {
    alert('Funcionalidad de pago próximamente...');
  }
}
