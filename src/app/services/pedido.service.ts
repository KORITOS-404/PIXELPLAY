import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Pedido, ReporteBoleta, ReporteFactura } from '../models/pedido.model';

interface PedidoResponse {
  content: Pedido[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';
  private pedidosSubject = new BehaviorSubject<Pedido[]>([]);
  public pedidos$ = this.pedidosSubject.asObservable();

  constructor(private http: HttpClient) {
    // Inicializar con datos mock si es necesario
    this.initializeMockData();
  }

  /**
   * Inicializa datos mock para pruebas
   */
  private initializeMockData(): void {
    const mockPedidos: Pedido[] = [
      {
        idPedido: 1,
        numeroPedido: 'PED-001',
        idUsuario: 1,
        datosCliente: {
          nombre: 'Juan',
          apellido: 'Pérez',
          correo: 'juan@example.com',
          telefono: '987654321',
          direccion: 'Calle Principal 123',
          ciudad: 'Lima'
        },
        detalles: [
          {
            idProducto: 1,
            nombreProducto: 'Elden Ring',
            cantidad: 1,
            precioUnitario: 69.99,
            subtotal: 69.99
          }
        ],
        fechaPedido: new Date().toISOString(),
        estado: 'COMPLETADO',
        montoTotal: 69.99,
        metadoPago: 'TARJETA_CREDITO',
        direccionEntrega: 'Calle Principal 123, Lima'
      },
      {
        idPedido: 2,
        numeroPedido: 'PED-002',
        idUsuario: 2,
        datosCliente: {
          nombre: 'María',
          apellido: 'García',
          correo: 'maria@example.com',
          telefono: '987654322',
          direccion: 'Calle Secundaria 456',
          ciudad: 'Lima'
        },
        detalles: [
          {
            idProducto: 2,
            nombreProducto: 'The Legend of Zelda',
            cantidad: 2,
            precioUnitario: 59.99,
            subtotal: 119.98
          }
        ],
        fechaPedido: new Date().toISOString(),
        estado: 'PENDIENTE',
        montoTotal: 119.98,
        metadoPago: 'TARJETA_DEBITO',
        direccionEntrega: 'Calle Secundaria 456, Lima'
      }
    ];

    this.pedidosSubject.next(mockPedidos);
  }

  /**
   * Obtener todos los pedidos con paginación
   */
  listarPedidos(page: number = 0, size: number = 10): Observable<PedidoResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PedidoResponse>(`${this.apiUrl}`, { params });
  }

  /**
   * Obtener pedidos activos (sin cancelados)
   */
  listarActivos(page: number = 0, size: number = 10): Observable<PedidoResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('estado', 'COMPLETADO,PENDIENTE,ENTREGADO');

    return this.http.get<PedidoResponse>(`${this.apiUrl}/activos`, { params });
  }

  /**
   * Buscar pedidos por criterio
   */
  buscar(keyword: string, page: number = 0, size: number = 10): Observable<PedidoResponse> {
    const params = new HttpParams()
      .set('search', keyword)
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PedidoResponse>(`${this.apiUrl}/buscar`, { params });
  }

  /**
   * Obtener un pedido por ID
   */
  obtenerPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  /**
   * Guardar un nuevo pedido
   */
  guardar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(`${this.apiUrl}`, pedido);
  }

  /**
   * Actualizar un pedido
   */
  actualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  /**
   * Actualizar estado del pedido
   */
  actualizarEstado(id: number, estado: string): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}/estado`, { estado });
  }

  /**
   * Eliminar un pedido
   */
  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  /**
   * Generar boleta para un pedido
   */
  generarBoleta(idPedido: number): Observable<ReporteBoleta> {
    return this.http.get<ReporteBoleta>(`${this.apiUrl}/${idPedido}/boleta`);
  }

  /**
   * Generar factura para un pedido con RUC
   */
  generarFactura(idPedido: number, numeroRUC: string): Observable<ReporteFactura> {
    const params = new HttpParams().set('ruc', numeroRUC);
    return this.http.get<ReporteFactura>(`${this.apiUrl}/${idPedido}/factura`, { params });
  }

  /**
   * Descargar boleta como PDF
   */
  descargarBoletaPDF(idPedido: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${idPedido}/boleta/pdf`, { responseType: 'blob' });
  }

  /**
   * Descargar factura como PDF
   */
  descargarFacturaPDF(idPedido: number, numeroRUC: string): Observable<Blob> {
    const params = new HttpParams().set('ruc', numeroRUC);
    return this.http.get(`${this.apiUrl}/${idPedido}/factura/pdf`, { params, responseType: 'blob' });
  }

  /**
   * Obtener pedidos por usuario
   */
  obtenerPorUsuario(idUsuario: number, page: number = 0, size: number = 10): Observable<PedidoResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PedidoResponse>(`${this.apiUrl}/usuario/${idUsuario}`, { params });
  }

  /**
   * Obtener estadísticas de pedidos
   */
  obtenerEstadisticas(): Observable<any> {
    return this.http.get(`${this.apiUrl}/estadisticas`);
  }
}
