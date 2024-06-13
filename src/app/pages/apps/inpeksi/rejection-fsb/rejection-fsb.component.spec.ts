import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectionFSBComponent } from './rejection-fsb.component';

describe('RejectionFSBComponent', () => {
  let component: RejectionFSBComponent;
  let fixture: ComponentFixture<RejectionFSBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RejectionFSBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectionFSBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
