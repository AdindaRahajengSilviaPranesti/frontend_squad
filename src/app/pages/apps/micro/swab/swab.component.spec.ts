import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwabComponent } from './swab.component';

describe('SwabComponent', () => {
  let component: SwabComponent;
  let fixture: ComponentFixture<SwabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
