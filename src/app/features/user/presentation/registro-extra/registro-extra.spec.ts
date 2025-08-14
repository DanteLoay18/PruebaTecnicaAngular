import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroExtra } from './registro-extra';

describe('RegistroExtra', () => {
  let component: RegistroExtra;
  let fixture: ComponentFixture<RegistroExtra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroExtra]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroExtra);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
