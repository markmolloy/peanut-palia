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
export class ScreenshotModal implements OnInit, OnDestroy {
  @Input() havePlushies: Plushie[] = [];
  @Input() wantPlushies: Plushie[] = [];
  @Output() close = new EventEmitter<void>();
  @ViewChild('modal', { static: true }) modalRef!: ElementRef<HTMLDivElement>;
  private sub!: Subscription;
  readonly Download = Download;

  isSaving = false; // ✅ spinner flag

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
    this.isSaving = true; // show spinner
    const modal = this.modalRef.nativeElement;
    if (!modal) return;

    try {
      // Wait for fonts and images to load
      await document.fonts.ready;
      const imgs = Array.from(modal.querySelectorAll('img'));
      await Promise.all(
        imgs.map(img =>
          img.complete
            ? Promise.resolve(true)
            : new Promise(resolve => (img.onload = img.onerror = () => resolve(true)))
        )
      );

      // Clone modal
      const clone = modal.cloneNode(true) as HTMLElement;

      // Remove buttons
      const buttons = clone.querySelectorAll('.close-btn, .save-btn');
      buttons.forEach(btn => btn.remove());

      // Adjust grid columns for cloned modal
      clone.querySelectorAll('.plushie-list').forEach(list => {
        const numItems = list.children.length;
        const columns = Math.min(numItems, 8); // max 8 columns
        (list as HTMLElement).style.display = 'grid';
        (list as HTMLElement).style.gridTemplateColumns = `repeat(${columns}, 80px)`; // fixed width
        (list as HTMLElement).style.justifyContent = 'start'; // don't stretch
        (list as HTMLElement).style.gap = '1rem';
      });

      // Position clone offscreen
      const rect = modal.getBoundingClientRect();
      clone.style.position = 'absolute';
      clone.style.top = '0';
      clone.style.left = '0';
      clone.style.transform = 'none';
      clone.style.width = 'auto'; // allow width to shrink naturally
      clone.style.height = 'auto';
      clone.style.maxWidth = 'none';
      clone.style.maxHeight = 'none';
      clone.style.overflow = 'visible';
      clone.style.zIndex = '9999';

      // Container to hold clone offscreen
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '-9999px';
      container.style.left = '-9999px';
      container.appendChild(clone);
      document.body.appendChild(container);

      // Render with html2canvas
      const canvas = await html2canvas(clone, { backgroundColor: '#1a1a1a', scale: 2 });
      const blob = await new Promise<Blob | null>(res => canvas.toBlob(res));
      if (blob) {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'tradelist.png';
        link.click();
      }

      document.body.removeChild(container);
    } catch (err) {
      console.error('Error saving modal:', err);
    } finally {
      this.isSaving = false; // hide spinner
    }
  }



}

