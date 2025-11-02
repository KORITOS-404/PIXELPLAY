import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-usuarios.html',
  styleUrls: ['./crud-usuarios.css']
})
export class CrudUsuarios implements OnInit {
  usuarios: Usuario[] = [];
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

  newUsuario: Usuario = {
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    telefono: '',
    direccion: '',
    rol: 'ROLE_USER'
  };

  roles = ['ROLE_USER', 'ROLE_ADMIN'];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.usuarioService.listarTodos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.usuarios = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los usuarios';
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  buscarUsuarios(): void {
    if (this.searchKeyword.trim()) {
      this.isLoading = true;
      this.usuarioService.buscar(this.searchKeyword, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.usuarios = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al buscar usuarios';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.cargarUsuarios();
    }
  }

  openCreateModal(): void {
    this.isEditMode = false;
    this.newUsuario = {
      nombre: '',
      apellido: '',
      correo: '',
      password: '',
      telefono: '',
      direccion: '',
      rol: 'ROLE_USER'
    };
    this.showModal = true;
  }

  openEditModal(usuario: Usuario): void {
    this.isEditMode = true;
    this.newUsuario = { ...usuario };
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.errorMessage = '';
  }

  saveUsuario(): void {
    if (!this.newUsuario.nombre || !this.newUsuario.nombre.trim()) {
      this.errorMessage = 'El nombre es obligatorio';
      return;
    }

    if (!this.newUsuario.apellido || !this.newUsuario.apellido.trim()) {
      this.errorMessage = 'El apellido es obligatorio';
      return;
    }

    if (!this.newUsuario.correo || !this.newUsuario.correo.trim()) {
      this.errorMessage = 'El correo es obligatorio';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.newUsuario.correo)) {
      this.errorMessage = 'El correo no es válido';
      return;
    }

    if (!this.isEditMode && (!this.newUsuario.password || this.newUsuario.password.length < 6)) {
      this.errorMessage = 'La contraseña debe tener al menos 6 caracteres';
      return;
    }

    if (!this.newUsuario.telefono || !this.newUsuario.telefono.trim()) {
      this.errorMessage = 'El teléfono es obligatorio';
      return;
    }

    if (!this.newUsuario.direccion || !this.newUsuario.direccion.trim()) {
      this.errorMessage = 'La dirección es obligatoria';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    if (this.isEditMode && this.newUsuario.idUsuario) {
      this.usuarioService.actualizar(this.newUsuario.idUsuario, this.newUsuario).subscribe({
        next: () => {
          this.successMessage = '✅ Usuario actualizado correctamente';
          this.cargarUsuarios();
          this.closeModal();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al actualizar el usuario';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.usuarioService.crear(this.newUsuario).subscribe({
        next: () => {
          this.successMessage = '✅ Usuario creado correctamente';
          this.cargarUsuarios();
          this.closeModal();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al crear el usuario';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }

  deleteUsuario(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.isLoading = true;
      this.usuarioService.eliminar(id).subscribe({
        next: () => {
          this.successMessage = '✅ Usuario eliminado correctamente';
          this.cargarUsuarios();
          this.isLoading = false;
          setTimeout(() => this.successMessage = '', 3000);
        },
        error: (error) => {
          this.errorMessage = 'Error al eliminar el usuario';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    }
  }

  getTotalUsuarios(): number {
    return this.totalElements;
  }

  getAdminCount(): number {
    return this.usuarios.filter(u => u.rol === 'ROLE_ADMIN').length;
  }

  getUserCount(): number {
    return this.usuarios.filter(u => u.rol === 'ROLE_USER').length;
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.cargarUsuarios();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.cargarUsuarios();
    }
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.cargarUsuarios();
  }


  descargarExcel(): void {
  this.isLoading = true;
  
  this.usuarioService.exportarExcel().subscribe({
    next: (blob) => {
      // Crear URL del blob
      const url = window.URL.createObjectURL(blob);
      
      // Crear elemento <a> temporal para descargar
      const link = document.createElement('a');
      link.href = url;
      link.download = 'usuarios.xlsx';
      link.click();
      
      // Limpiar
      window.URL.revokeObjectURL(url);
      
      this.successMessage = '✅ Excel descargado correctamente';
      this.isLoading = false;
      setTimeout(() => this.successMessage = '', 3000);
    },
    error: (error) => {
      this.errorMessage = 'Error al descargar Excel';
      console.error('Error:', error);
      this.isLoading = false;
    }
  });
}
}
