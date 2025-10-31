import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // ← AGREGAR ESTA LÍNEA
})
export class Carrito {}
