import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviFormComponent } from './suivi-form.component';

describe('SuiviFormComponent', () => {
  let component: SuiviFormComponent;
  let fixture: ComponentFixture<SuiviFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuiviFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuiviFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
