import { Component, ChangeDetectionStrategy , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../../services/usuario';
import { Usuario } from '../../models/Usuario';

@Component({
  selector: 'app-crud-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crud-usuarios.html',
  styleUrls: [
    '../crud-principal/crud-principal.css',  // Importar estilos principales
    './crud-usuarios.css'                    // Mantener estilos específicos
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CrudUsuarios implements OnInit {
  usuarios: Usuario[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.usuarioService.listar().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los usuarios';
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }
}
