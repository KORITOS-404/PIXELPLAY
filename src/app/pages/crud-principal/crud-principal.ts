import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, OnInit, HostListener } from '@angular/core';
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
  isUserDropdownVisible = false;

  ngOnInit() {
    this.cdr.markForCheck();
  }

  toggleSidebar() {
    this.isSidebarToggled = !this.isSidebarToggled;
    console.log('Sidebar collapsed:', this.isSidebarToggled);
    this.cdr.markForCheck();
  }

  toggleUserDropdown() {
    this.isUserDropdownVisible = !this.isUserDropdownVisible;
    console.log('Dropdown visible:', this.isUserDropdownVisible);
    // Forzar detección inmediata
    this.cdr.detectChanges();
  }

  closeDropdown() {
    this.isUserDropdownVisible = false;
    this.cdr.markForCheck();
  }

  // Cerrar dropdown al hacer click fuera
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    const userMenu = target.closest('.user-menu');
    
    if (!userMenu && this.isUserDropdownVisible) {
      this.isUserDropdownVisible = false;
      this.cdr.markForCheck();
    }
  }
}
