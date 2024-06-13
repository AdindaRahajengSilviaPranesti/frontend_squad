import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionOci1Component } from './rejection-oci1.component';

describe('RejectionOci1Component', () => {
  let component: RejectionOci1Component;
  let fixture: ComponentFixture<RejectionOci1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionOci1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectionOci1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
