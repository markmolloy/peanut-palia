import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  
  @Output() screenshot = new EventEmitter<void>();

  toggleScreenshot() {
    this.screenshot.emit();
  }
}