import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganicComponent } from './organic.component';

describe('OrganicComponent', () => {
  let component: OrganicComponent;
  let fixture: ComponentFixture<OrganicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
