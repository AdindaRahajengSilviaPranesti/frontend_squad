import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReagenStockComponent } from './reagen-stock.component';

describe('ReagenStockComponent', () => {
  let component: ReagenStockComponent;
  let fixture: ComponentFixture<ReagenStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReagenStockComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReagenStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
