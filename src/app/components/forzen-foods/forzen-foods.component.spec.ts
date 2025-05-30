import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForzenFoodsComponent } from './forzen-foods.component';

describe('ForzenFoodsComponent', () => {
  let component: ForzenFoodsComponent;
  let fixture: ComponentFixture<ForzenFoodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForzenFoodsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForzenFoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
