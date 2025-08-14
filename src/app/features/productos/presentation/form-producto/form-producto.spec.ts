import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRestaurante } from './form-producto';

describe('FormRestaurante', () => {
  let component: FormRestaurante;
  let fixture: ComponentFixture<FormRestaurante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormRestaurante]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormRestaurante);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
