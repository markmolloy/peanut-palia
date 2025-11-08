import { Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import plushieData from '../json/plushies.json';
import setsData from '../json/sets.json';
import { Plushie } from '../models/plushie.model';
import { Header } from './header/header';
import { ScreenshotModal } from './screenshot-modal/screenshot-modal';
import { PlushieGridComponent } from './plushie-grid/plushie-grid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface PlushieSet {
  id: number;
  category: string;
  name: string;
  members: number[];
}

interface PlushieColumn {
  type: 'set' | 'orphans';
  setName: string;
  cards: Plushie[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ScreenshotModal, PlushieGridComponent, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  plushies: { [category: string]: PlushieColumn[] } = {};
  organizedPlushies: { [category: string]: any[] } = {};
  isScreenshotOpen = false;
  filterText: string = '';

  ngOnInit() {
  const data = plushieData as Plushie[];
  const sets = setsData as PlushieSet[];

  // Map plushies by id for quick lookup
  const plushieById = new Map<number, Plushie>();
  data.forEach(p => plushieById.set(p.id, p));

  // Initialize plushies object by category
  this.plushies = {};
  data.forEach(p => {
    this.plushies[p.category] = this.plushies[p.category] ?? [];
  });

  // Add sets
  sets.forEach(set => {
    // Ensure category exists
    this.plushies[set.category] = this.plushies[set.category] ?? [];

    const anyCard: Plushie = {
      id: 70000 + set.id * 2,
      category: set.category,
      name: `Any (${set.name})`,
      image: 'peanington.png',
      status: null,
      quantity: 1
    };
    const fullSetCard: Plushie = {
      id: 70000 + set.id * 2 + 1,
      category: set.category,
      name: `Full Set (${set.name})`,
      image: 'peanington.png',
      status: null,
      quantity: 1
    };

    const members = set.members
      .map(id => plushieById.get(id))
      .filter((p): p is Plushie => !!p);

    const column: PlushieColumn = {
      type: 'set',
      setName: set.name,
      cards: [anyCard, fullSetCard, ...members]
    };

    this.plushies[set.category].push(column);
  });

  // Add plushies not in any set as "orphans"
  const setMemberIds = new Set(sets.flatMap(s => s.members));
  data.forEach(p => {
    if (!setMemberIds.has(p.id)) {
      // Ensure category exists
      this.plushies[p.category] = this.plushies[p.category] ?? [];

      // Find or create orphan column
      let orphanColumn = this.plushies[p.category].find(c => c.type === 'orphans');
      if (!orphanColumn) {
        orphanColumn = { type: 'orphans', setName: 'Unassigned', cards: [] };
        this.plushies[p.category].unshift(orphanColumn);
      }

      orphanColumn.cards.push(p);
    }
  });

  console.log('Organized Plushies:', this.plushies);
}



  get havePlushies(): Plushie[] {
    return Object.values(this.plushies)
      .flatMap(cols => cols.flatMap(c => c.cards))
      .filter(p => p.status === 'have');
  }

  get wantPlushies(): Plushie[] {
    return Object.values(this.plushies)
      .flatMap(cols => cols.flatMap(c => c.cards))
      .filter(p => p.status === 'want');
  }


  toggleScreenshot() {
    this.isScreenshotOpen = true;
  }
}

// Add "Any" card at start of each subcategory
    // 