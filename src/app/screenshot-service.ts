// src/app/services/screenshot.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScreenshotService {
  private triggerSaveSource = new Subject<void>();
  triggerSave$ = this.triggerSaveSource.asObservable();

  requestSave() {
    console.log('ScreenshotService: requestSave called');
    this.triggerSaveSource.next();
  }
}
