import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseOverviewComponent } from './release-overview.component';

describe('ReleaseOverviewComponent', () => {
  let component: ReleaseOverviewComponent;
  let fixture: ComponentFixture<ReleaseOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReleaseOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
