import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, Navbar, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class App {
  
  constructor(private router: Router) {}

  isAdminRoute(): boolean {
    return this.router.url.startsWith('/admin');
  }
}
