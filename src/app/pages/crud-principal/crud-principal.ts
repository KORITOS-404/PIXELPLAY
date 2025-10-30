import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-principal', // ← Cambié de 'app-layout' a 'app-crud-principal'
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './crud-principal.html',
  styleUrls: ['./crud-principal.css']
})
export class CrudPrincipal implements OnInit {
  isSidebarToggled = false;

  ngOnInit(): void {
    const savedState = localStorage.getItem('sidebar-toggle');
    if (savedState === 'true') {
      this.isSidebarToggled = true;
    }
  }

  toggleSidebar(): void {
    this.isSidebarToggled = !this.isSidebarToggled;
    localStorage.setItem('sidebar-toggle', this.isSidebarToggled.toString());
  }
}

