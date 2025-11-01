import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarCodigo } from './recuperar-codigo';

describe('RecuperarCodigo', () => {
  let component: RecuperarCodigo;
  let fixture: ComponentFixture<RecuperarCodigo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarCodigo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarCodigo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
