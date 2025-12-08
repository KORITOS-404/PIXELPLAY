export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  apellido: string;
  correo: string;
  password: string;
  direccion?: string;
  telefono?: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  nombre: string;
  apellido: string;
  correo: string;
  rol: string;
  telefono?: string;
  direccion?: string;
}
