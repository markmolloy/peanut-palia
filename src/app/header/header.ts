import { Component, Output, EventEmitter } from '@angular/core';
import { LucideAngularModule, Camera, Download } from 'lucide-angular';
import { ModalRefService } from '../modal-ref-service';
import { ScreenshotService } from '../screenshot-service';

@Component({
  selector: 'app-header',
  imports: [LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private modalRef: ModalRefService, private screenshotService: ScreenshotService) {}

  readonly Camera = Camera;
  readonly Download = Download;
  
  @Output() screenshot = new EventEmitter<void>();
  @Output() save = new EventEmitter<void>();

  toggleScreenshot() {
    this.screenshot.emit();
  }

  saveModal() {
    this.screenshotService.requestSave();
  }
}