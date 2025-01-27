import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTextQuestionComponent } from './free-text-question.component';

describe('FreeTextQuestionComponent', () => {
  let component: FreeTextQuestionComponent;
  let fixture: ComponentFixture<FreeTextQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeTextQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeTextQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
