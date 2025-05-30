import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PThumnailComponent } from './p-thumnail.component';

describe('PThumnailComponent', () => {
  let component: PThumnailComponent;
  let fixture: ComponentFixture<PThumnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PThumnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PThumnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
