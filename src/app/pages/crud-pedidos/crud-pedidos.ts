import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido, ReporteBoleta, ReporteFactura, DetallePedido } from '../../models/pedido.model';

@Component({
  selector: 'app-crud-pedidos',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './crud-pedidos.html',
  styleUrls: ['./crud-pedidos.css']
})
export class CrudPedidosComponent implements OnInit {
  pedidos: Pedido[] = [];
  isLoading = false;
  errorMessage = '';
  successMessage = '';
  searchKeyword = '';

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  // Estados para modales
  showBoletaModal = false;
  showFacturaModal = false;
  showDetallesModal = false;
  showRUCModal = false;
  showEstadoModal = false; // ← NUEVO

  // Datos seleccionados
  selectedPedido: Pedido | null = null;
  boletaData: ReporteBoleta | null = null;
  facturaData: ReporteFactura | null = null;
  numeroRUC = '';
  nuevoEstado = ''; // ← NUEVO

  // Estados UI
  generandoBoleta = false;
  generandoFactura = false;
  cambiandoEstado = false; // ← NUEVO

  // Estados disponibles
  estadosDisponibles = [ // ← NUEVO
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

  /**
   * Cargar pedidos del servidor
   */
  cargarPedidos(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.pedidoService.listarPedidos(this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.pedidos = response.content || response;
        this.totalElements = response.totalElements || this.pedidos.length;
        this.totalPages = response.totalPages || 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error al cargar pedidos:', err);
        this.errorMessage = 'Error al cargar los pedidos. Intente nuevamente.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Buscar pedidos por palabra clave
   */
  buscarPedidos(): void {
    if (!this.searchKeyword.trim()) {
      this.currentPage = 0;
      this.cargarPedidos();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.pedidoService.buscar(this.searchKeyword, this.currentPage, this.pageSize).subscribe({
      next: (response: any) => {
        this.pedidos = response.content || response;
        this.totalElements = response.totalElements || this.pedidos.length;
        this.totalPages = response.totalPages || 1;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error en búsqueda:', err);
        this.errorMessage = 'Error al buscar pedidos.';
        this.isLoading = false;
      }
    });
  }

  /**
   * Ir a la página anterior
   */
  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.cargarPedidos();
    }
  }

  /**
   * Ir a la página siguiente
   */
  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.cargarPedidos();
    }
  }

  /**
   * Obtener total de pedidos (métrica)
   */
  getTotalPedidos(): number {
    return this.totalElements;
  }

  /**
   * Obtener pedidos completados (métrica)
   */
  getPedidosCompletados(): number {
    return this.pedidos.filter(p => p.estado === 'COMPLETADO').length;
  }

  /**
   * Obtener monto total de todos los pedidos (métrica)
   */
  getMontoTotal(): number {
    return this.pedidos.reduce((total, p) => total + p.montoTotal, 0);
  }

  /**
   * Obtener monto promedio por pedido (métrica)
   */
  getMontoPromedio(): number {
    if (this.pedidos.length === 0) return 0;
    return this.getMontoTotal() / this.pedidos.length;
  }

  /**
   * Abrir modal con detalles del pedido
   */
  openDetallesModal(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.showDetallesModal = true;
  }

  /**
   * ============================================
   * NUEVO: CAMBIAR ESTADO DEL PEDIDO
   * ============================================
   */
  abrirModalEstado(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.nuevoEstado = pedido.estado;
    this.showEstadoModal = true;
  }

  cambiarEstado(): void {
    if (!this.selectedPedido?.idPedido || !this.nuevoEstado) {
      this.errorMessage = 'Error: Debe seleccionar un estado válido';
      return;
    }

    this.cambiandoEstado = true;
    this.errorMessage = '';

    this.pedidoService.actualizarEstado(this.selectedPedido.idPedido, this.nuevoEstado).subscribe({
      next: () => {
        this.successMessage = `Estado cambiado a ${this.nuevoEstado} exitosamente`;
        this.showEstadoModal = false;
        this.cambiandoEstado = false;
        this.cargarPedidos(); // Recargar la lista
      },
      error: (err) => {
        console.error('Error al cambiar estado:', err);
        this.errorMessage = 'Error al cambiar el estado del pedido';
        this.cambiandoEstado = false;
      }
    });
  }

  /**
   * Generar boleta
   */
  generarBoleta(pedido: Pedido): void {
    if (!pedido.idPedido) {
      this.errorMessage = 'Error: ID de pedido no disponible';
      return;
    }

    this.generandoBoleta = true;
    this.errorMessage = '';

    this.pedidoService.generarBoleta(pedido.idPedido).subscribe({
      next: (boleta: ReporteBoleta) => {
        this.boletaData = boleta;
        this.selectedPedido = pedido;
        this.showBoletaModal = true;
        this.generandoBoleta = false;
        this.successMessage = 'Boleta generada exitosamente';
      },
      error: (err) => {
        console.error('Error al generar boleta:', err);
        this.generarBoletaMock(pedido);
      }
    });
  }

  /**
   * Generar boleta mock cuando el servidor no está disponible
   */
  private generarBoletaMock(pedido: Pedido): void {
    const boleta: ReporteBoleta = {
      numeroBoleta: `BOL-${Date.now()}`,
      fechaEmision: new Date().toISOString(),
      cliente: pedido.datosCliente,
      detalles: pedido.detalles,
      montoTotal: pedido.montoTotal,
      montoPagado: pedido.montoTotal,
      metodoPago: pedido.metadoPago
    };
    this.boletaData = boleta;
    this.selectedPedido = pedido;
    this.showBoletaModal = true;
    this.successMessage = 'Boleta generada (datos de demo)';
    this.generandoBoleta = false;
  }

  /**
   * Solicitar RUC para generar factura
   */
  solicitarRUC(pedido: Pedido): void {
    this.selectedPedido = pedido;
    this.numeroRUC = '';
    this.showRUCModal = true;
  }

  /**
   * Generar factura con RUC
   */
  generarFactura(): void {
    if (!this.numeroRUC.trim()) {
      this.errorMessage = 'Por favor ingrese un número de RUC válido';
      return;
    }

    if (!this.selectedPedido?.idPedido) {
      this.errorMessage = 'Error: ID de pedido no disponible';
      return;
    }

    this.generandoFactura = true;
    this.errorMessage = '';

    this.pedidoService.generarFactura(this.selectedPedido.idPedido, this.numeroRUC).subscribe({
      next: (factura: ReporteFactura) => {
        this.facturaData = factura;
        this.showFacturaModal = true;
        this.showRUCModal = false;
        this.generandoFactura = false;
        this.successMessage = 'Factura generada exitosamente';
      },
      error: (err) => {
        console.error('Error al generar factura:', err);
        this.generarFacturaMock();
      }
    });
  }

  /**
   * Generar factura mock cuando el servidor no está disponible
   */
  private generarFacturaMock(): void {
    if (!this.selectedPedido) return;

    const subtotal = this.selectedPedido.montoTotal / 1.18;
    const igv = this.selectedPedido.montoTotal - subtotal;

    const factura: ReporteFactura = {
      numeroFactura: `FAC-${Date.now()}`,
      fechaEmision: new Date().toISOString(),
      numeroRUC: this.numeroRUC,
      cliente: this.selectedPedido.datosCliente,
      detalles: this.selectedPedido.detalles,
      montoTotal: this.selectedPedido.montoTotal,
      montoSubtotal: subtotal,
      montoIGV: igv,
      montoPagado: this.selectedPedido.montoTotal,
      metodoPago: this.selectedPedido.metadoPago
    };
    this.facturaData = factura;
    this.showFacturaModal = true;
    this.showRUCModal = false;
    this.generandoFactura = false;
    this.successMessage = 'Factura generada (datos de demo)';
  }

  /**
   * Descargar boleta como PDF
   */
  descargarBoletaPDF(): void {
    if (!this.selectedPedido?.idPedido) {
      this.errorMessage = 'Error: ID de pedido no disponible';
      return;
    }

    this.pedidoService.descargarBoletaPDF(this.selectedPedido.idPedido).subscribe({
      next: (blob: Blob) => {
        this.descargarArchivo(blob, `boleta-${this.selectedPedido?.numeroPedido}.pdf`);
      },
      error: (err) => {
        console.error('Error al descargar boleta:', err);
        this.descargarBoletaMock();
      }
    });
  }

  /**
   * Descargar boleta mock
   */
  private descargarBoletaMock(): void {
    const contenido = this.generarContenidoBoletaHTML();
    const blob = new Blob([contenido], { type: 'text/html' });
    this.descargarArchivo(blob, `boleta-${this.selectedPedido?.numeroPedido}.html`);
    this.successMessage = 'Boleta descargada';
  }

  /**
   * Descargar factura como PDF
   */
  descargarFacturaPDF(): void {
    if (!this.selectedPedido?.idPedido) {
      this.errorMessage = 'Error: ID de pedido no disponible';
      return;
    }

    this.pedidoService.descargarFacturaPDF(this.selectedPedido.idPedido, this.numeroRUC).subscribe({
      next: (blob: Blob) => {
        this.descargarArchivo(blob, `factura-${this.selectedPedido?.numeroPedido}.pdf`);
      },
      error: (err) => {
        console.error('Error al descargar factura:', err);
        this.descargarFacturaMock();
      }
    });
  }

  /**
   * Descargar factura mock
   */
  private descargarFacturaMock(): void {
    const contenido = this.generarContenidoFacturaHTML();
    const blob = new Blob([contenido], { type: 'text/html' });
    this.descargarArchivo(blob, `factura-${this.selectedPedido?.numeroPedido}.html`);
    this.successMessage = 'Factura descargada';
  }

  /**
   * Generar contenido HTML de boleta (para descargar)
   */
  private generarContenidoBoletaHTML(): string {
    if (!this.boletaData || !this.selectedPedido) return '';

    const detalles = this.boletaData.detalles
      .map(d => `
        <tr>
          <td>${d.nombreProducto}</td>
          <td>${d.cantidad}</td>
          <td>$${d.precioUnitario.toFixed(2)}</td>
          <td>$${(d.cantidad * d.precioUnitario).toFixed(2)}</td>
        </tr>
      `).join('');

    return `  
      <!DOCTYPE html>
      <html>
        <head>
          <title>Boleta</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>BOLETA DE VENTA</h1>
            <p>PixelPlay Store</p>
            <p>${this.boletaData.numeroBoleta}</p>
          </div>
          <p><strong>Cliente:</strong> ${this.boletaData.cliente.nombre} ${this.boletaData.cliente.apellido}</p>
          <p><strong>Dirección:</strong> ${this.boletaData.cliente.direccion}</p>
          <table>
            <thead>
              <tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${detalles}
              <tr><td colspan="3"><strong>TOTAL:</strong></td><td><strong>$${this.boletaData.montoTotal.toFixed(2)}</strong></td></tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
  }

  /**
   * Generar contenido HTML de factura (para descargar)
   */
  private generarContenidoFacturaHTML(): string {
    if (!this.facturaData || !this.selectedPedido) return '';

    const detalles = this.facturaData.detalles
      .map(d => `
        <tr>
          <td>${d.nombreProducto}</td>
          <td>${d.cantidad}</td>
          <td>$${d.precioUnitario.toFixed(2)}</td>
          <td>$${(d.cantidad * d.precioUnitario).toFixed(2)}</td>
        </tr>
      `).join('');

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Factura</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
            th { background-color: #f5f5f5; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>FACTURA ELECTRÓNICA</h1>
            <p>PixelPlay Store</p>
            <p>RUC: ${this.facturaData.numeroRUC}</p>
            <p>${this.facturaData.numeroFactura}</p>
          </div>
          <p><strong>Cliente:</strong> ${this.facturaData.cliente.nombre} ${this.facturaData.cliente.apellido}</p>
          <p><strong>Dirección:</strong> ${this.facturaData.cliente.direccion}</p>
          <table>
            <thead>
              <tr><th>Producto</th><th>Cant.</th><th>Precio</th><th>Total</th></tr>
            </thead>
            <tbody>
              ${detalles}
              <tr><td colspan="3">Subtotal:</td><td>$${this.facturaData.montoSubtotal.toFixed(2)}</td></tr>
              <tr><td colspan="3">IGV (18%):</td><td>$${this.facturaData.montoIGV.toFixed(2)}</td></tr>
              <tr><td colspan="3"><strong>TOTAL:</strong></td><td><strong>$${this.facturaData.montoTotal.toFixed(2)}</strong></td></tr>
            </tbody>
          </table>
        </body>
      </html>
    `;
  }

  /**
   * Descargar archivo
   */
  private descargarArchivo(blob: Blob, nombre: string): void {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = nombre;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  /**
   * Cerrar modal
   */
  closeModal(): void {
    this.showBoletaModal = false;
    this.showFacturaModal = false;
    this.showDetallesModal = false;
    this.showRUCModal = false;
    this.showEstadoModal = false; // ← NUEVO
    this.selectedPedido = null;
    this.boletaData = null;
    this.facturaData = null;
    this.numeroRUC = '';
    this.nuevoEstado = ''; // ← NUEVO
  }

  /**
   * Limpiar mensajes
   */
  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }

  /**
   * Obtener clase CSS para estado del pedido
   */
  getEstadoClass(estado: string): string {
    const clases: { [key: string]: string } = {
      'COMPLETADO': 'status-completed',
      'PENDIENTE': 'status-pending',
      'ENTREGADO': 'status-delivered',
      'CANCELADO': 'status-cancelled',
      'CONFIRMADO': 'status-completed',
      'EN_PREPARACION': 'status-pending',
      'ENVIADO': 'status-delivered'
    };
    return clases[estado] || 'status-pending';
  }

  /**
   * Obtener etiqueta legible del estado
   */
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

  /**
   * Obtener cantidad total de artículos en un pedido
   */
  getTotalArticulos(pedido: Pedido): number {
    return pedido.detalles.reduce((sum, d) => sum + d.cantidad, 0);
  }

  /**
   * Formatear nombre del método de pago
   */
  formatarMetodoPago(metodo: string): string {
    return metodo.replace(/_/g, ' ');
  }
}
