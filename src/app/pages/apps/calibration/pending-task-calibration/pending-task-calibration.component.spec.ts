import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTaskCalibrationComponent } from './pending-task-calibration.component';

describe('PendingTaskCalibrationComponent', () => {
  let component: PendingTaskCalibrationComponent;
  let fixture: ComponentFixture<PendingTaskCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTaskCalibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendingTaskCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
