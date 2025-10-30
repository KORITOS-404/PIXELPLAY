import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudMetricas } from './crud-metricas';

describe('CrudTablasusuario', () => {
  let component: CrudMetricas;
  let fixture: ComponentFixture<CrudMetricas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudMetricas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudMetricas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
