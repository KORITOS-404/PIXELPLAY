import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud-metricas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crud-metricas.html',
  styleUrls: ['./crud-metricas.css']
})
export class CrudMetricas implements OnInit {
  ngOnInit(): void {
    // Aquí puedes integrar Chart.js o cualquier otra librería de gráficos
    console.log('Charts component initialized');
  }
}
