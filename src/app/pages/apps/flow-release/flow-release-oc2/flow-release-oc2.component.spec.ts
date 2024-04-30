import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowReleaseOc2Component } from './flow-release-oc2.component';

describe('FlowReleaseOc2Component', () => {
  let component: FlowReleaseOc2Component;
  let fixture: ComponentFixture<FlowReleaseOc2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowReleaseOc2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowReleaseOc2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
