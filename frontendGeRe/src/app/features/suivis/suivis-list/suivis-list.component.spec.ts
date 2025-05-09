import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuivisListComponent } from './suivis-list.component';

describe('SuivisListComponent', () => {
  let component: SuivisListComponent;
  let fixture: ComponentFixture<SuivisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuivisListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuivisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
