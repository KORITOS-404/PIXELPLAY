import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // ← AGREGAR ESTA LÍNEA
})
export class Categorias {}
