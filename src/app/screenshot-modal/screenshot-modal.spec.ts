import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenshotModal } from './screenshot-modal';

describe('ScreenshotModal', () => {
  let component: ScreenshotModal;
  let fixture: ComponentFixture<ScreenshotModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenshotModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScreenshotModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
