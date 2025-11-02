import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';


@Component({
  selector: 'app-crud-metricas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './crud-metricas.html',
  styleUrls: ['./crud-metricas.css']
})
export class CrudMetricas implements OnInit {
  productos: Producto[] = [];
  isLoading = false;
  
  totalProductos = 0;
  totalStock = 0;
  valorTotal = 0;
  
  categorias = [
    { nombre: 'Videojuegos', cantidad: 0, porcentaje: 0, color: '#667eea' },
    { nombre: 'Consolas', cantidad: 0, porcentaje: 0, color: '#764ba2' },
    { nombre: 'Accesorios', cantidad: 0, porcentaje: 0, color: '#F7971E' },
    { nombre: 'Merchandising', cantidad: 0, porcentaje: 0, color: '#34e89e' }
  ];
  
  topProductos: Array<{nombre: string, cantidad: number, porcentaje: number}> = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.isLoading = true;
    
    this.productoService.listarActivos(0, 100).subscribe({
      next: (response) => {
        this.productos = response.content;
        this.calcularMetricas();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar datos:', error);
        this.isLoading = false;
      }
    });
  }

  calcularMetricas(): void {
    this.totalProductos = this.productos.length;
    this.totalStock = this.productos.reduce((sum, p) => sum + p.stock, 0);
    this.valorTotal = this.productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
    
    this.categorias.forEach(cat => {
      const productosCategoria = this.productos.filter(p => p.genero === cat.nombre);
      cat.cantidad = productosCategoria.length;
      cat.porcentaje = this.totalProductos > 0 ? (cat.cantidad / this.totalProductos) * 100 : 0;
    });
    
    const productosSorted = [...this.productos].sort((a, b) => b.stock - a.stock).slice(0, 5);
    const maxStock = productosSorted[0]?.stock || 1;
    
    this.topProductos = productosSorted.map(p => ({
      nombre: p.nombre,
      cantidad: p.stock,
      porcentaje: (p.stock / maxStock) * 100
    }));
  }

  getCumulativePercentage(index: number): number {
    let cumulative = 0;
    for (let i = 0; i < index; i++) {
      cumulative += this.categorias[i].porcentaje;
    }
    return cumulative * 3.6;
  }
}
