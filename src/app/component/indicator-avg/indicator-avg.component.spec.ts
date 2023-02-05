import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorAvgComponent } from './indicator-avg.component';

describe('IndicatorAvgComponent', () => {
  let component: IndicatorAvgComponent;
  let fixture: ComponentFixture<IndicatorAvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndicatorAvgComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndicatorAvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
