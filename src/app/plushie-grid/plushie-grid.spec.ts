import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlushieGrid } from './plushie-grid';

describe('PlushieGrid', () => {
  let component: PlushieGrid;
  let fixture: ComponentFixture<PlushieGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlushieGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlushieGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
