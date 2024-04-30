import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCalibrationComponent } from './print-calibration.component';

describe('PrintCalibrationComponent', () => {
  let component: PrintCalibrationComponent;
  let fixture: ComponentFixture<PrintCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCalibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
