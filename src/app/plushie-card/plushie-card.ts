import { Component, Input, OnInit } from '@angular/core';
import { Plushie } from '../../models/plushie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plushie-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './plushie-card.html',
  styleUrl: './plushie-card.scss',
})
export class PlushieCardComponent implements OnInit {
  @Input() plushie!: Plushie;

  ngOnInit() {
    if (this.plushie.quantity === undefined || this.plushie.quantity === null) {
      this.plushie.quantity = 1;
    }
  }


  toggleStatus(type: 'have' | 'want') {
    if (this.plushie.status === type) {
      this.plushie.status = null;
    } else {
      this.plushie.status = type;
    }
  }

  increaseQuantity() {
    if (this.plushie.quantity !== undefined) this.plushie.quantity++;
  }

  decreaseQuantity() {
    if (this.plushie.quantity && this.plushie.quantity > 1) this.plushie.quantity--;
  }
}
