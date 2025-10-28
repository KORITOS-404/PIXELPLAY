import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { getProductos, eliminarProducto } from '../../services/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  templateUrl: './list.html',
  imports: [CommonModule, RouterModule], 
})
export class ProductList {
  productos = signal<any[]>([]);
  cargando = signal(true);

  async ngOnInit() {
    this.productos.set(await getProductos());
    this.cargando.set(false);
  }

  async eliminar(id: number) {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;
    await eliminarProducto(id);
    this.productos.set(this.productos().filter(p => p.id !== id));
  }
}
