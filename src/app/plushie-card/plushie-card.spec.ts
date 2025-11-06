import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlushieCard } from './plushie-card';

describe('PlushieCard', () => {
  let component: PlushieCard;
  let fixture: ComponentFixture<PlushieCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlushieCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlushieCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
