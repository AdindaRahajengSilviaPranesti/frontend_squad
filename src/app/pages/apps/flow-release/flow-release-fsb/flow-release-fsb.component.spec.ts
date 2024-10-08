import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowReleaseFsbComponent } from './flow-release-fsb.component';

describe('FlowReleaseFsbComponent', () => {
  let component: FlowReleaseFsbComponent;
  let fixture: ComponentFixture<FlowReleaseFsbComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowReleaseFsbComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowReleaseFsbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
