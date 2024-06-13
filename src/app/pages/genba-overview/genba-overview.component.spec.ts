import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenbaOverviewComponent } from './genba-overview.component';

describe('GenbaOverviewComponent', () => {
  let component: GenbaOverviewComponent;
  let fixture: ComponentFixture<GenbaOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenbaOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenbaOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
