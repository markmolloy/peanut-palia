import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { Plushie } from '../../models/plushie.model';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import { LucideAngularModule, Download } from 'lucide-angular';
import { Subscription } from 'rxjs';
import { ScreenshotService } from '../screenshot-service';

@Component({
  selector: 'app-screenshot-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './screenshot-modal.html',
  styleUrls: ['./screenshot-modal.scss'],
})
export class ScreenshotModal implements OnInit, OnDestroy  {
  @Input() havePlushies: Plushie[] = [];
  @Input() wantPlushies: Plushie[] = [];
  @Output() close = new EventEmitter<void>();
  @ViewChild('modal', { static: true }) modalRef!: ElementRef<HTMLDivElement>;
  private sub!: Subscription;
  readonly Download = Download;

  constructor(private screenshotService: ScreenshotService, private el: ElementRef) {}

  ngOnInit() {
    this.sub = this.screenshotService.triggerSave$.subscribe(() => this.saveModal());
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  closeModal() {
    this.close.emit();
  }

  async saveModal() {
    console.log('ScreenshotModal: saveModal called'); 
    const modal = this.modalRef.nativeElement;
    if (!modal) return;

    // Wait for fonts and images
    await document.fonts.ready;
    const imgs = Array.from(modal.querySelectorAll('img'));
    await Promise.all(
      imgs.map(img =>
        img.complete
          ? Promise.resolve(true)
          : new Promise(resolve => { img.onload = img.onerror = () => resolve(true); })
      )
    );

    // Clone modal
    const clone = modal.cloneNode(true) as HTMLElement;

    // Remove UI buttons from clone
    const buttons = clone.querySelectorAll('.close-btn, .save-btn');
    buttons.forEach(btn => btn.remove());

    // Copy computed dimensions
    const rect = modal.getBoundingClientRect();
    clone.style.position = 'absolute';
    clone.style.top = '0';
    clone.style.left = '0';
    clone.style.transform = 'none';
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.maxWidth = 'none';
    clone.style.maxHeight = 'none';
    clone.style.overflow = 'visible';
    clone.style.zIndex = '9999';

    // Offscreen container
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '-9999px';
    container.style.left = '-9999px';
    container.style.width = `${rect.width}px`;
    container.style.height = `${rect.height}px`;
    container.appendChild(clone);
    document.body.appendChild(container);

    // Capture
    html2canvas(clone, { backgroundColor: '#1a1a1a', scale: 2 }).then(canvas => {
      canvas.toBlob(blob => {
        if (!blob) return;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'modal-screenshot.png';
        link.click();
      });
    }).finally(() => {
      document.body.removeChild(container);
    });
  }


}
