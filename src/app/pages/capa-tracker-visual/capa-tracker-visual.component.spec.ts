import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapaTrackerVisualComponent } from './capa-tracker-visual.component';

describe('CapaTrackerVisualComponent', () => {
  let component: CapaTrackerVisualComponent;
  let fixture: ComponentFixture<CapaTrackerVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapaTrackerVisualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapaTrackerVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
