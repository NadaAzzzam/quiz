import { TestBed } from '@angular/core/testing';

import { QuestionTypeRegistryService } from './question-type-registry.service';

describe('QuestionTypeRegistryService', () => {
  let service: QuestionTypeRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionTypeRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
