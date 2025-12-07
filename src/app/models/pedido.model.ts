export interface DetallePedido {
  idDetalle?: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal?: number;
  descripcion?: string;
}

export interface DatosCliente {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal?: string;
}

export interface Pedido {
  idPedido?: number;
  numeroPedido?: string;
  idUsuario: number;
  datosCliente: DatosCliente;
  detalles: DetallePedido[];
  fechaPedido?: string;
  estado: 'PENDIENTE' | 'COMPLETADO' | 'CANCELADO' | 'ENTREGADO';
  montoTotal: number;
  metadoPago: string;
  numeroRUC?: string;
  direccionEntrega: string;
}

export interface ReporteBoleta {
  numeroBoleta: string;
  fechaEmision: string;
  cliente: DatosCliente;
  detalles: DetallePedido[];
  montoTotal: number;
  montoPagado: number;
  metodoPago: string;
}

export interface ReporteFactura {
  numeroFactura: string;
  fechaEmision: string;
  numeroRUC: string;
  cliente: DatosCliente;
  detalles: DetallePedido[];
  montoTotal: number;
  montoSubtotal: number;
  montoIGV: number;
  montoPagado: number;
  metodoPago: string;
}
