import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface CartItem {
  id: number;
  title: string;
  price: number;
  platform?: string;
  imageUrl?: string;
  quantity: number;
  selected?: boolean;
}

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {
  items: CartItem[] = [
    {
      id: 1,
      title: 'EA Sports FC 25',
      price: 229.9,
      platform: 'PS5 · Xbox · PC',
      imageUrl: 'assets/covers/fc25.jpg',
      quantity: 1,
      selected: false
    }
  ];

  toggleSelect(item: CartItem) {
    item.selected = !item.selected;
  }

  decreaseQty(item: CartItem) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  increaseQty(item: CartItem) {
    item.quantity++;
  }

  removeItem(item: CartItem) {
    const idx = this.items.findIndex(i => i.id === item.id);
    if (idx > -1) this.items.splice(idx, 1);
  }

  get subtotal(): number {
    return this.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  get discount(): number {
    return 0; // placeholder for discount logic
  }

  get shipping(): number {
    return this.items.length ? 10 : 0;
  }

  get total(): number {
    return this.subtotal - this.discount + this.shipping;
  }
}
