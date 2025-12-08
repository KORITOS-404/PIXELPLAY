import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../models/pedido.model';

@Component({
  selector: 'app-crud-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-pedidos.html',
  styleUrls: ['./crud-pedidos.css']
})
export class CrudPedidos implements OnInit {
  pedidos: Pedido[] = [];
  showDetallesModal = false;
  showEstadoModal = false;
  showRUCModal = false;
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  searchKeyword = '';

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  selectedPedido: Pedido | null = null;
  nuevoEstado = '';
  numeroRUC = '';
  cambiandoEstado = false;
  generandoFactura = false;

  estadosDisponibles = [
    'PENDIENTE',
    'CONFIRMADO',
    'EN_PREPARACION',
    'ENVIADO',
    'ENTREGADO',
    'COMPLETADO',
    'CANCELADO'
  ];

  constructor(private pedidoService: PedidoService) {}

  ngOnInit(): void {
    this.cargarPedidos();
  }

  cargarPedidos(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.pedidoService.listarPedidos(this.currentPage, this.pageSize).subscribe({
      next: (response) => {
        this.pedidos = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los pedidos';
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  buscarPedidos(): void {
    if (this.searchKeyword.trim()) {
      this.isLoading = true;
      this.pedidoService.buscar(this.searchKeyword, this.currentPage, this.pageSize).subscribe({
        next: (response) => {
          this.pedidos = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al buscar pedidos';
          console.error('Error:', error);
          this.isLoading = false;
        }
      });
    } else {
      this.cargarPedidos();
    }
  }

  openDetallesModal(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.showDetallesModal = true;
  }

  openEstadoModal(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.nuevoEstado = pedido.estado;
    this.showEstadoModal = true;
  }

  closeModal(): void {
    this.showDetallesModal = false;
    this.showEstadoModal = false;
    this.showRUCModal = false;
    this.selectedPedido = null;
    this.errorMessage = '';
    this.numeroRUC = '';
    this.nuevoEstado = '';
  }

  cambiarEstado(): void {
    if (!this.selectedPedido?.idPedido || !this.nuevoEstado) {
      this.errorMessage = 'Debe seleccionar un estado válido';
      return;
    }

    this.cambiandoEstado = true;
    this.errorMessage = '';

    this.pedidoService.actualizarEstado(this.selectedPedido.idPedido, this.nuevoEstado).subscribe({
      next: () => {
        this.successMessage = '✅ Estado actualizado correctamente';
        this.cargarPedidos();
        this.closeModal();
        this.cambiandoEstado = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error al cambiar el estado';
        console.error('Error:', error);
        this.cambiandoEstado = false;
      }
    });
  }

  solicitarRUC(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.numeroRUC = '';
    this.showRUCModal = true;
  }

  generarBoleta(pedido: Pedido): void {
    if (!pedido.idPedido) {
      this.errorMessage = 'Error: ID de pedido no disponible';
      return;
    }

    this.isLoading = true;
    this.pedidoService.descargarBoletaPDF(pedido.idPedido).subscribe({
      next: (blob) => {
        this.descargarArchivo(blob, `boleta-${pedido.numeroPedido}.pdf`);
        this.successMessage = '✅ Boleta descargada correctamente';
        this.isLoading = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error al generar boleta';
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }

  generarFactura(): void {
    if (!this.numeroRUC.trim()) {
      this.errorMessage = 'Por favor ingrese un RUC válido';
      return;
    }

    if (!this.selectedPedido?.idPedido) {
      this.errorMessage = 'Error: ID de pedido no disponible';
      return;
    }

    this.generandoFactura = true;
    this.errorMessage = '';

    this.pedidoService.descargarFacturaPDF(this.selectedPedido.idPedido, this.numeroRUC).subscribe({
      next: (blob) => {
        this.descargarArchivo(blob, `factura-${this.selectedPedido?.numeroPedido}.pdf`);
        this.successMessage = '✅ Factura descargada correctamente';
        this.closeModal();
        this.generandoFactura = false;
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error al generar factura';
        console.error('Error:', error);
        this.generandoFactura = false;
      }
    });
  }

  private descargarArchivo(blob: Blob, nombre: string): void {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombre;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  getTotalPedidos(): number {
    return this.totalElements;
  }

  getPedidosPendientes(): number {
    return this.pedidos.filter(p => p.estado === 'PENDIENTE').length;
  }

  getPedidosCompletados(): number {
    return this.pedidos.filter(p => p.estado === 'COMPLETADO').length;
  }

  getMontoTotal(): number {
    return this.pedidos.reduce((total, p) => total + p.montoTotal, 0);
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.cargarPedidos();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.cargarPedidos();
    }
  }

  getEstadoClass(estado: string): string {
    const clases: { [key: string]: string } = {
      'COMPLETADO': 'status-completed',
      'PENDIENTE': 'status-pending',
      'ENTREGADO': 'status-delivered',
      'CANCELADO': 'status-cancelled',
      'CONFIRMADO': 'status-confirmed',
      'EN_PREPARACION': 'status-preparing',
      'ENVIADO': 'status-sent'
    };
    return clases[estado] || 'status-pending';
  }

  getEstadoLabel(estado: string): string {
    const etiquetas: { [key: string]: string } = {
      'COMPLETADO': 'Completado',
      'PENDIENTE': 'Pendiente',
      'ENTREGADO': 'Entregado',
      'CANCELADO': 'Cancelado',
      'CONFIRMADO': 'Confirmado',
      'EN_PREPARACION': 'En Preparación',
      'ENVIADO': 'Enviado'
    };
    return etiquetas[estado] || estado;
  }

  formatarMetodoPago(metodo: string): string {
    return metodo.replace(/_/g, ' ');
  }

  getNombreCliente(pedido: Pedido): string {
    if (pedido.cliente) return pedido.cliente;
    if (pedido.datosCliente) {
      return `${pedido.datosCliente.nombre} ${pedido.datosCliente.apellido}`;
    }
    if (pedido.nombre && pedido.apellido) {
      return `${pedido.nombre} ${pedido.apellido}`;
    }
    return 'N/A';
  }

  getCorreoCliente(pedido: Pedido): string {
    return pedido.correo || pedido.datosCliente?.correo || 'N/A';
  }

  getTelefonoCliente(pedido: Pedido): string {
    return pedido.telefono || pedido.datosCliente?.telefono || 'N/A';
  }

  getDireccionCliente(pedido: Pedido): string {
    return pedido.direccion || pedido.datosCliente?.direccion || 'N/A';
  }
}
