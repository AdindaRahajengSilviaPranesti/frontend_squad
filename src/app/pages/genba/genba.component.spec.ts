import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenbaComponent } from './genba.component';

describe('GenbaComponent', () => {
  let component: GenbaComponent;
  let fixture: ComponentFixture<GenbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenbaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
