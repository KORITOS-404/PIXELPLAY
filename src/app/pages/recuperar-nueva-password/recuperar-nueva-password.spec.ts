import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarNuevaPassword } from './recuperar-nueva-password';

describe('RecuperarNuevaPassword', () => {
  let component: RecuperarNuevaPassword;
  let fixture: ComponentFixture<RecuperarNuevaPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarNuevaPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarNuevaPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
