import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketVisitOverviewComponent } from './market-visit-overview.component';

describe('MarketVisitOverviewComponent', () => {
  let component: MarketVisitOverviewComponent;
  let fixture: ComponentFixture<MarketVisitOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketVisitOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketVisitOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
