import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionOci2Component } from './rejection-oci2.component';

describe('RejectionOci2Component', () => {
  let component: RejectionOci2Component;
  let fixture: ComponentFixture<RejectionOci2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionOci2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectionOci2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
