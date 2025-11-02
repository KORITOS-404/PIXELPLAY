import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto.service';
import { Producto } from '../../models/producto.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-dashboard.html',
  styleUrls: ['./crud-dashboard.css']
})
export class CrudDashboard implements OnInit {
  productos: Producto[] = [];
  isEditMode = false;
  showModal = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  searchKeyword = '';

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
    if (!this.newProducto.nombre || !this.newProducto.nombre.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return;
    }

    if (!this.newProducto.genero) {
      this.errorMessage = 'Debe seleccionar un género';
      return;
    }

    if (this.newProducto.precio <= 0) {
      this.errorMessage = 'El precio debe ser mayor a 0';
      return;
    }

    if (this.newProducto.stock < 0) {
      this.errorMessage = 'El stock no puede ser negativo';
      return;
    }

    if (!this.newProducto.codigoBarras || !this.newProducto.codigoBarras.trim()) {
      this.errorMessage = 'El código de barras es obligatorio';
      return;
    }

    if (!this.newProducto.imageUrl || !this.newProducto.imageUrl.trim()) {
      this.errorMessage = 'La URL de imagen es obligatoria';
      return;
    }

    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(this.newProducto.imageUrl)) {
      this.errorMessage = 'La URL de imagen no es válida';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.newProducto.idProducto) {
      this.productoService.actualizar(this.newProducto.idProducto, this.newProducto).subscribe({
        next: () => {
          this.successMessage = '✅ Producto actualizado correctamente';
          this.cargarProductos();
          this.closeModal();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el producto';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.productoService.crear(this.newProducto).subscribe({
        next: () => {
          this.successMessage = '✅ Producto creado correctamente';
          this.cargarProductos();
          this.closeModal();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
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
          this.successMessage = '✅ Producto eliminado correctamente';
          this.cargarProductos();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
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
