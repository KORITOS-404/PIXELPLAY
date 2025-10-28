import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

const http = inject(HttpClient);
const API_URL = 'http://localhost:8080/productos';

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

export async function getProductos(): Promise<Producto[]> {
  return await firstValueFrom(http.get<Producto[]>(API_URL));
}

export async function getProducto(id: number): Promise<Producto> {
  return await firstValueFrom(http.get<Producto>(`${API_URL}/${id}`));
}

export async function crearProducto(data: Producto): Promise<Producto> {
  return await firstValueFrom(http.post<Producto>(API_URL, data));
}

export async function actualizarProducto(id: number, data: Producto): Promise<Producto> {
  return await firstValueFrom(http.put<Producto>(`${API_URL}/${id}`, data));
}

export async function eliminarProducto(id: number): Promise<void> {
  await firstValueFrom(http.delete<void>(`${API_URL}/${id}`));
}
