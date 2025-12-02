import { Injectable, signal, computed } from '@angular/core';

export interface CartItem {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
  badge?: string;
  descripcion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Signal privado para los items
  private _items = signal<CartItem[]>(this.loadFromLocalStorage());
  
  // Señales públicas de solo lectura
  items = this._items.asReadonly();
  
  // Computed signals
  itemCount = computed(() => {
    return this._items().reduce((total, item) => total + item.cantidad, 0);
  });
  
  total = computed(() => {
    return this._items().reduce((total, item) => 
      total + (item.precio * item.cantidad), 0
    );
  });

  constructor() {
    // Sincronizar con localStorage cuando cambien los items
    this.saveToLocalStorage();
  }

  // Agregar producto al carrito
  addItem(product: {
    id?: number | string;
    nombre: string;
    precio: number | string;
    imagen: string;
    badge?: string;
    descripcion?: string;
  }): void {
    const precio = typeof product.precio === 'string' 
      ? parseFloat(product.precio.replace('S/', '').trim()) 
      : product.precio;
    
    const productId = product.id?.toString() || this.generateId(product.nombre);
    
    const existingItem = this._items().find(item => item.id === productId);
    
    if (existingItem) {
      // Si existe, incrementar cantidad
      this.updateQuantity(productId, existingItem.cantidad + 1);
    } else {
      // Si no existe, agregar nuevo
      const newItem: CartItem = {
        id: productId,
        nombre: product.nombre,
        precio: precio,
        imagen: product.imagen,
        cantidad: 1,
        badge: product.badge,
        descripcion: product.descripcion
      };
      
      this._items.update(items => [...items, newItem]);
      this.saveToLocalStorage();
    }
  }

  // Actualizar cantidad
  updateQuantity(id: string, cantidad: number): void {
    if (cantidad <= 0) {
      this.removeItem(id);
      return;
    }
    
    this._items.update(items => 
      items.map(item => 
        item.id === id ? { ...item, cantidad } : item
      )
    );
    this.saveToLocalStorage();
  }

  // Eliminar item
  removeItem(id: string): void {
    this._items.update(items => items.filter(item => item.id !== id));
    this.saveToLocalStorage();
  }

  // Vaciar carrito
  clearCart(): void {
    this._items.set([]);
    this.saveToLocalStorage();
  }

  // Generar ID único basado en nombre
  private generateId(nombre: string): string {
    return nombre.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
  }

  // Guardar en localStorage
  private saveToLocalStorage(): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('gaming-cart', JSON.stringify(this._items()));
    }
  }

  // Cargar desde localStorage
  private loadFromLocalStorage(): CartItem[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('gaming-cart');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  }

  // Obtener item por ID
  getItem(id: string): CartItem | undefined {
    return this._items().find(item => item.id === id);
  }
}
