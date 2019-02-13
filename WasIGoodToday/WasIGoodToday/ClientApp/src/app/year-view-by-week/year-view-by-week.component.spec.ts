import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YearViewByWeekComponent } from './year-view-by-week.component';

describe('YearViewByWeekComponent', () => {
  let component: YearViewByWeekComponent;
  let fixture: ComponentFixture<YearViewByWeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YearViewByWeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YearViewByWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
