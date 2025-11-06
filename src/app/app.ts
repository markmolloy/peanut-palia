import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import plushieData from '../json/plushies.json';
import { Plushie } from '../models/plushie.model';
import { Header } from './header/header';
import { ScreenshotModal } from './screenshot-modal/screenshot-modal';
import { PlushieGridComponent } from './plushie-grid/plushie-grid';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ScreenshotModal, PlushieGridComponent, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  plushies: Plushie[] = [];

  isScreenshotOpen = false;

  ngOnInit() {
    const data = plushieData as any[];
    const organized = new Map<string, Set<string>>();

    // Collect unique categories/subcategories
    data.forEach(p => {
      if (!organized.has(p.category)) organized.set(p.category, new Set());
      organized.get(p.category)?.add(p.subcategory);
    });

    // Push all original plushies
    this.plushies = [...data];

    console.log('Organized Plushies:', organized);
    // Add “Any” cards at source level
    let anyIdCounter = 69000;
    organized.forEach((subcats, category) => {
      subcats.forEach(subcategory => {
        this.plushies.push({
          name: 'Any',
          category,
          subcategory,
          quantity: 1,
          status: null,
          image: 'assets/images/any.png',
          id: anyIdCounter++
        });
      });
    });
  }

  get havePlushies(): Plushie[] {
    return this.plushies.filter(p => p.status === 'have');
  }

  get wantPlushies(): Plushie[] {
    return this.plushies.filter(p => p.status === 'want');
  }

  toggleScreenshot() {
    this.isScreenshotOpen = true;
  }
}
