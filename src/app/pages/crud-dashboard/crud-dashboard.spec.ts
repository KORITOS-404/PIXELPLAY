import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudDashboard } from './crud-dashboard';

describe('CrudMetricas', () => {
  let component: CrudDashboard;
  let fixture: ComponentFixture<CrudDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudDashboard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudDashboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
