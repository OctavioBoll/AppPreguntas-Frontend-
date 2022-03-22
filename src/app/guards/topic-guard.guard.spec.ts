import { TestBed } from '@angular/core/testing';

import { TopicGuardGuard } from './topic-guard.guard';

describe('TopicGuardGuard', () => {
  let guard: TopicGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TopicGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
