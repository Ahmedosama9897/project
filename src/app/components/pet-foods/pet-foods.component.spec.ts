import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PetFoodsComponent } from './pet-foods.component';

describe('PetFoodsComponent', () => {
  let component: PetFoodsComponent;
  let fixture: ComponentFixture<PetFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PetFoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PetFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
