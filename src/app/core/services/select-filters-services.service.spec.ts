import { TestBed } from '@angular/core/testing';

import { SelectFiltersServicesService } from './select-filters-services.service';

describe('SelectFiltersServicesService', () => {
  let service: SelectFiltersServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectFiltersServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
