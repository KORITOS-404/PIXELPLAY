import { Component, ChangeDetectionStrategy, ChangeDetectorRef, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crud-principal',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './crud-principal.html',
  styleUrls: ['./crud-principal.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CrudPrincipal implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);
  
  isSidebarToggled = false;
  isUserDropdownVisible = false;
  searchQuery = '';

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
    this.cdr.detectChanges();
  }

  closeDropdown() {
    this.isUserDropdownVisible = false;
    this.cdr.markForCheck();
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      console.log('Buscando:', this.searchQuery);
    }
  }

  logout() {
    this.closeDropdown();
    console.log('Cerrando sesión...');
    this.router.navigate(['/login']);
  }

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
