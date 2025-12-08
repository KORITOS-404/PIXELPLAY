export interface Pedido {
  idPedido: number;
  numeroPedido: string;
  idUsuario?: number;
  
  // Campos directos del pedido (pueden estar presentes o no)
  cliente?: string;
  nombre?: string;
  apellido?: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  
  // Objeto datosCliente (puede ser null o undefined)
  datosCliente?: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
    ciudad?: string;
  } | null;
  
  detalles: DetallePedido[];
  fechaPedido: string;
  estado: string;
  montoTotal: number;
  metadoPago: string;
  direccionEntrega?: string;
}

export interface DetallePedido {
  idDetallePedido?: number;
  idProducto: number;
  nombreProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface ReporteBoleta {
  numeroBoleta: string;
  fechaEmision: string;
  cliente: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
  };
  detalles: DetallePedido[];
  montoTotal: number;
  montoPagado: number;
  metodoPago: string;
}

export interface ReporteFactura {
  numeroFactura: string;
  fechaEmision: string;
  numeroRUC: string;
  cliente: {
    nombre: string;
    apellido: string;
    correo: string;
    telefono: string;
    direccion: string;
  };
  detalles: DetallePedido[];
  montoTotal: number;
  montoSubtotal: number;
  montoIGV: number;
  montoPagado: number;
  metodoPago: string;
}
