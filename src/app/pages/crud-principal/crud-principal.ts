import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-crud-principal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './crud-principal.html',
  styleUrls: ['./crud-principal.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudPrincipal implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  
  isSidebarToggled = false;

  ngOnInit() {
    this.cdr.markForCheck();
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    
    // Debug para verificar el estado
    console.log('Sidebar collapsed:', this.isSidebarToggled);
    
    // Forzar detección de cambios
    this.cdr.markForCheck();
  }
}
