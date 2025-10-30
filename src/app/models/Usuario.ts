export interface Usuario {
  idUsuario?: number;
  nombre: string;
  apellido: string;           
  correo: string;             
  password: string;          
  direccion?: string;
  telefono?: string;
  roles?: Role[];             
}

export interface Role {
  idRol?: number;
  nombre: string;
}
