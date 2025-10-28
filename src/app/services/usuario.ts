import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const http = inject(HttpClient);
const API_URL = 'http://localhost:8080/usuarios';

export interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
}

export async function getUsuarios(): Promise<Usuario[]> {
  return await firstValueFrom(http.get<Usuario[]>(API_URL));
}

export async function getUsuario(id: number): Promise<Usuario> {
  return await firstValueFrom(http.get<Usuario>(`${API_URL}/${id}`));
}

export async function crearUsuario(data: Usuario): Promise<Usuario> {
  return await firstValueFrom(http.post<Usuario>(API_URL, data));
}

export async function actualizarUsuario(id: number, data: Usuario): Promise<Usuario> {
  return await firstValueFrom(http.put<Usuario>(`${API_URL}/${id}`, data));
}

export async function eliminarUsuario(id: number): Promise<void> {
  await firstValueFrom(http.delete<void>(`${API_URL}/${id}`));
}
