import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCalibrationComponent } from './dashboard-calibration.component';

describe('DashboardCalibrationComponent', () => {
  let component: DashboardCalibrationComponent;
  let fixture: ComponentFixture<DashboardCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCalibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
