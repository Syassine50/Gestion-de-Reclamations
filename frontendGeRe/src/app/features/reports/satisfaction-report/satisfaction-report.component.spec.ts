import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatisfactionReportComponent } from './satisfaction-report.component';

describe('SatisfactionReportComponent', () => {
  let component: SatisfactionReportComponent;
  let fixture: ComponentFixture<SatisfactionReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SatisfactionReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SatisfactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
