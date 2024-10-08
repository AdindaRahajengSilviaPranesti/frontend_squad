import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultCalibrationComponent } from './result-calibration.component';

describe('ResultCalibrationComponent', () => {
  let component: ResultCalibrationComponent;
  let fixture: ComponentFixture<ResultCalibrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultCalibrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultCalibrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
