import { Component, ChangeDetectionStrategy , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/product';
import { Producto } from '../../models/Producto';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-crud-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './crud-dashboard.html',
  styleUrls: ['./crud-dashboard.css'] ,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudDashboard implements OnInit {
  productos: Producto[] = [];
  isEditMode = false;
  showModal = false;
  isLoading = false;
  errorMessage = '';
  searchKeyword = '';

  // Paginación
  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  newProducto: Producto = {
    nombre: '',
    descripcion: '',
    genero: '',
    precio: 0,
    codigoBarras: '',
    stock: 0,
    imageUrl: ''
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.productoService.listarActivos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.productos = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos';
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  buscarProductos(): void {
    if (this.searchKeyword.trim()) {
      this.isLoading = true;
      this.productoService.buscar(this.searchKeyword, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.productos = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al buscar productos';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.cargarProductos();
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.newProducto = {
      nombre: '',
      descripcion: '',
      genero: '',
      precio: 0,
      codigoBarras: '',
      stock: 0,
      imageUrl: ''
    };
    this.showModal = true;
  }

  openEditModal(producto: Producto): void {
    this.isEditMode = true;
    this.newProducto = { ...producto };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.errorMessage = '';
  }

  saveProducto(): void {
    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.newProducto.idProducto) {
      // Actualizar producto existente
      this.productoService.actualizar(this.newProducto.idProducto, this.newProducto).subscribe({
        next: () => {
          this.cargarProductos();
          this.closeModal();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el producto';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } else {
      // Crear nuevo producto
      this.productoService.crear(this.newProducto).subscribe({
        next: () => {
          this.cargarProductos();
          this.closeModal();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el producto';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }

  deleteProducto(id: number): void {
    if (confirm('¿Estás seguro de eliminar este producto?')) {
      this.isLoading = true;
      this.productoService.eliminar(id).subscribe({
        next: () => {
          this.cargarProductos();
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el producto';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }

  getTotalValue(): number {
    return this.productos.reduce((sum, p) => sum + (p.precio * p.stock), 0);
  }

  getTotalStock(): number {
    return this.productos.reduce((sum, p) => sum + p.stock, 0);
  }

  // Métodos de paginación
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.cargarProductos();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.cargarProductos();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.cargarProductos();
  }
}
