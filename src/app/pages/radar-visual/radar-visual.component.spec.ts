import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarVisualComponent } from './radar-visual.component';

describe('RadarVisualComponent', () => {
  let component: RadarVisualComponent;
  let fixture: ComponentFixture<RadarVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarVisualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadarVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
