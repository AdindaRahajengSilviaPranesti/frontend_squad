import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MikroFinishgoodComponent } from './mikro-finishgood.component';

describe('MikroFinishgoodComponent', () => {
  let component: MikroFinishgoodComponent;
  let fixture: ComponentFixture<MikroFinishgoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MikroFinishgoodComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MikroFinishgoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
