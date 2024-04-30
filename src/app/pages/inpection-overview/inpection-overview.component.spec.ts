import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InpectionOverviewComponent } from './inpection-overview.component';

describe('InpectionOverviewComponent', () => {
  let component: InpectionOverviewComponent;
  let fixture: ComponentFixture<InpectionOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InpectionOverviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InpectionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
