import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearViewByMonthComponent } from './year-view-by-month.component';

describe('YearViewByMonthComponent', () => {
  let component: YearViewByMonthComponent;
  let fixture: ComponentFixture<YearViewByMonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearViewByMonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearViewByMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
