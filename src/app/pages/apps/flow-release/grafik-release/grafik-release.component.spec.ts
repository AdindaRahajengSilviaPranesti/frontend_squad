import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafikReleaseComponent } from './grafik-release.component';

describe('GrafikReleaseComponent', () => {
  let component: GrafikReleaseComponent;
  let fixture: ComponentFixture<GrafikReleaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafikReleaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrafikReleaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
