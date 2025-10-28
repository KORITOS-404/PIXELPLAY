// src/app/components/product/form.ts
import { Component, signal, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { crearProducto, actualizarProducto, getProducto, Producto } from '../../services/product';

@Component({
  selector: 'product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.html',
})
export class ProductForm {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  id = signal<number | null>(null);
  cargando = signal(false);

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    descripcion: new FormControl(''),
    precio: new FormControl<number | null>(null),
    stock: new FormControl<number | null>(null),
  });

  async ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      const nid = Number(paramId);
      if (!Number.isNaN(nid)) {
        this.id.set(nid);
        await this.load(nid);
      }
    }
  }

  private async load(id: number) {
    this.cargando.set(true);
    try {
      const p = await getProducto(id);
      if (p) {
        this.form.patchValue({
          nombre: p.nombre ?? '',
          descripcion: p.descripcion ?? '',
          precio: p.precio ?? null,
          stock: p.stock ?? null,
        });
      }
    } catch (err) {
      console.error(err);
      alert('No se pudo cargar el producto');
    } finally {
      this.cargando.set(false);
    }
  }

  cancelar() {
    this.router.navigate(['/productos']);
  }

  async submit() {
    if (this.form.invalid) {
      alert('Complete los campos requeridos');
      return;
    }
    const payload: Producto = {
      nombre: this.form.value.nombre!,
      descripcion: this.form.value.descripcion ?? undefined,
      precio: this.form.value.precio ?? 0,
      stock: this.form.value.stock ?? 0,
    };
    try {
      if (this.id()) {
        await actualizarProducto(this.id() as number, payload);
        alert('Producto actualizado');
      } else {
        await crearProducto(payload);
        alert('Producto creado');
      }
      this.router.navigate(['/productos']);
    } catch (err) {
      console.error(err);
      alert('Error al guardar el producto');
    }
  }
}
