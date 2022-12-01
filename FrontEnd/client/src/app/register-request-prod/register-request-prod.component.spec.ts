import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRequestProdComponent } from './register-request-prod.component';

describe('RegisterRequestProdComponent', () => {
  let component: RegisterRequestProdComponent;
  let fixture: ComponentFixture<RegisterRequestProdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterRequestProdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRequestProdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
