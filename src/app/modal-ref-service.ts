import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalRefService {
  modalElement?: HTMLElement;

  setModal(el: HTMLElement) {
    this.modalElement = el;
  }

  getModal(): HTMLElement | undefined {
    return this.modalElement;
  }
}