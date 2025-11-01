import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuperarEmail } from './recuperar-email';

describe('RecuperarEmail', () => {
  let component: RecuperarEmail;
  let fixture: ComponentFixture<RecuperarEmail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarEmail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecuperarEmail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
