import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataAnalisisBpdComponent } from './data-analisis-bpd.component';

describe('DataAnalisisBpdComponent', () => {
  let component: DataAnalisisBpdComponent;
  let fixture: ComponentFixture<DataAnalisisBpdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataAnalisisBpdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataAnalisisBpdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
