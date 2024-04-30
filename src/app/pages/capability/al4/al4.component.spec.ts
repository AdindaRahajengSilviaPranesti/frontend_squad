import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Al4Component } from './al4.component';

describe('Al4Component', () => {
  let component: Al4Component;
  let fixture: ComponentFixture<Al4Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Al4Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Al4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
