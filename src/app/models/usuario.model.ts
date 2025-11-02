export interface Usuario {
  idUsuario?: number;
  nombre: string;
  apellido: string;
  correo: string;
  password?: string;
  telefono: string;
  direccion: string;
  rol?: string;
  activo?: boolean;
}
