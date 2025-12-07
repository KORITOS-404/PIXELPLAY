import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CrudPedidosComponent } from './crud-pedidos';
import { PedidoService } from '../../services/pedido.service';

describe('CrudPedidosComponent', () => {
  let component: CrudPedidosComponent;
  let fixture: ComponentFixture<CrudPedidosComponent>;
  let pedidoService: PedidoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPedidosComponent, CommonModule, FormsModule, HttpClientTestingModule],
      providers: [PedidoService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPedidosComponent);
    component = fixture.componentInstance;
    pedidoService = TestBed.inject(PedidoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load pedidos on init', () => {
    spyOn(component, 'cargarPedidos');
    component.ngOnInit();
    expect(component.cargarPedidos).toHaveBeenCalled();
  });

  it('should calculate total pedidos', () => {
    component.totalElements = 5;
    expect(component.getTotalPedidos()).toBe(5);
  });

  it('should calculate completed pedidos', () => {
    component.pedidos = [
      { idPedido: 1, estado: 'COMPLETADO', numeroPedido: 'PED-001' } as any,
      { idPedido: 2, estado: 'PENDIENTE', numeroPedido: 'PED-002' } as any
    ];
    expect(component.getPedidosCompletados()).toBe(1);
  });

  it('should calculate total amount', () => {
    component.pedidos = [
      { idPedido: 1, montoTotal: 100, estado: 'COMPLETADO' } as any,
      { idPedido: 2, montoTotal: 50, estado: 'PENDIENTE' } as any
    ];
    expect(component.getMontoTotal()).toBe(150);
  });

  it('should calculate average amount', () => {
    component.pedidos = [
      { idPedido: 1, montoTotal: 100, estado: 'COMPLETADO' } as any,
      { idPedido: 2, montoTotal: 50, estado: 'PENDIENTE' } as any
    ];
    expect(component.getMontoPromedio()).toBe(75);
  });

  it('should get correct status class', () => {
    expect(component.getEstadoClass('COMPLETADO')).toBe('status-completed');
    expect(component.getEstadoClass('PENDIENTE')).toBe('status-pending');
    expect(component.getEstadoClass('ENTREGADO')).toBe('status-delivered');
  });

  it('should get correct status label', () => {
    expect(component.getEstadoLabel('COMPLETADO')).toBe('Completado');
    expect(component.getEstadoLabel('PENDIENTE')).toBe('Pendiente');
    expect(component.getEstadoLabel('ENTREGADO')).toBe('Entregado');
  });

  it('should open detalles modal', () => {
    const pedido = { idPedido: 1, estado: 'COMPLETADO' } as any;
    component.openDetallesModal(pedido);
    expect(component.selectedPedido).toBe(pedido);
    expect(component.showDetallesModal).toBe(true);
  });

  it('should close all modals', () => {
    component.showBoletaModal = true;
    component.showFacturaModal = true;
    component.showDetallesModal = true;
    component.showRUCModal = true;
    
    component.closeModal();
    
    expect(component.showBoletaModal).toBe(false);
    expect(component.showFacturaModal).toBe(false);
    expect(component.showDetallesModal).toBe(false);
    expect(component.showRUCModal).toBe(false);
  });

  it('should clear messages', () => {
    component.errorMessage = 'Error';
    component.successMessage = 'Success';
    
    component.clearMessages();
    
    expect(component.errorMessage).toBe('');
    expect(component.successMessage).toBe('');
  });

  it('should navigate to next page', () => {
    component.currentPage = 0;
    component.totalPages = 3;
    spyOn(component, 'cargarPedidos');
    
    component.nextPage();
    
    expect(component.currentPage).toBe(1);
    expect(component.cargarPedidos).toHaveBeenCalled();
  });

  it('should not navigate past last page', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    spyOn(component, 'cargarPedidos');
    
    component.nextPage();
    
    expect(component.currentPage).toBe(2);
    expect(component.cargarPedidos).not.toHaveBeenCalled();
  });

  it('should navigate to previous page', () => {
    component.currentPage = 1;
    spyOn(component, 'cargarPedidos');
    
    component.previousPage();
    
    expect(component.currentPage).toBe(0);
    expect(component.cargarPedidos).toHaveBeenCalled();
  });

  it('should not navigate before first page', () => {
    component.currentPage = 0;
    spyOn(component, 'cargarPedidos');
    
    component.previousPage();
    
    expect(component.currentPage).toBe(0);
    expect(component.cargarPedidos).not.toHaveBeenCalled();
  });

  it('should solicitar RUC', () => {
    const pedido = { idPedido: 1, estado: 'COMPLETADO' } as any;
    component.solicitarRUC(pedido);
    
    expect(component.selectedPedido).toBe(pedido);
    expect(component.showRUCModal).toBe(true);
    expect(component.numeroRUC).toBe('');
  });
});
