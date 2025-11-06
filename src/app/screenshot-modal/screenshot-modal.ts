

// screenshot-modal.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Plushie } from '../../models/plushie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-screenshot-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './screenshot-modal.html',
  styleUrl: './screenshot-modal.scss',
})
export class ScreenshotModal  {
  @Input() havePlushies: Plushie[] = [];
  @Input() wantPlushies: Plushie[] = [];
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
}