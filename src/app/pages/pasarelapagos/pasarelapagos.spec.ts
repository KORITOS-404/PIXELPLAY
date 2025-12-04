import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pasarelapagos } from './pasarelapagos';

describe('Pasarelapagos', () => {
  let component: Pasarelapagos;
  let fixture: ComponentFixture<Pasarelapagos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pasarelapagos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pasarelapagos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
