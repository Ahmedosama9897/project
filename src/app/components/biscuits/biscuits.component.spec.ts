import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiscuitsComponent } from './biscuits.component';

describe('BiscuitsComponent', () => {
  let component: BiscuitsComponent;
  let fixture: ComponentFixture<BiscuitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BiscuitsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BiscuitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
