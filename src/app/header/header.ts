import { Component, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Camera, Download } from 'lucide-angular';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly Camera = Camera;
  readonly Download = Download;
  
  @Output() screenshot = new EventEmitter<void>();

  toggleScreenshot() {
    this.screenshot.emit();
  }

  saveModal() {}
}