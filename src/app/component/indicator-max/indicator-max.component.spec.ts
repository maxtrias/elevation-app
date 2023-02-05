import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorMaxComponent } from './indicator-max.component';

describe('IndicatorMaxComponent', () => {
  let component: IndicatorMaxComponent;
  let fixture: ComponentFixture<IndicatorMaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndicatorMaxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndicatorMaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
