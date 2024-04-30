import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedAreaMonitoringComponent } from './red-area-monitoring.component';

describe('RedAreaMonitoringComponent', () => {
  let component: RedAreaMonitoringComponent;
  let fixture: ComponentFixture<RedAreaMonitoringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedAreaMonitoringComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RedAreaMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
