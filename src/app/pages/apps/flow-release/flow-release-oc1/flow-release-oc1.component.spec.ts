import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowReleaseOc1Component } from './flow-release-oc1.component';

describe('FlowReleaseOc1Component', () => {
  let component: FlowReleaseOc1Component;
  let fixture: ComponentFixture<FlowReleaseOc1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowReleaseOc1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowReleaseOc1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
