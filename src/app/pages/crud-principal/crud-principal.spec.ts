import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudPrincipal } from './crud-principal';

describe('CRUDPrincipal', () => {
  let component: CrudPrincipal;
  let fixture: ComponentFixture<CrudPrincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudPrincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudPrincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
