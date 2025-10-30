import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule,  Navbar, Footer],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
@Component({
  selector: 'app-crud-metricas',
  standalone: true,
  imports: [FormsModule], // <<< agregar FormsModule
  templateUrl: './pages/crud-metricas/crud-metricas.html',
  styleUrls: ['./pages/crud-metricas/crud-metricas.css']
})
export class CrudMetricas {}