export interface Producto {
  idProducto?: number;
  nombre: string;
  descripcion: string;
  genero: string;
  precio: number;
  codigoBarras: string;
  stock: number;
  imageUrl: string;
  activo?: boolean;
}

export interface PageResponse<T> {
  content: T[];
  pageable: {
    pageNumber: number;
    pageSize: number;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
}
