import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import plushieData from '../json/plushies.json';
import setsData from '../json/sets.json';
import stickerData from '../json/stickers.json';
import artifactData from '../json/artifacts.json';
import { TradeItem, TradeItemSet, TradeItemColumn } from '../models/trade-item.model';
import { Header } from './header/header';
import { ScreenshotModal } from './screenshot-modal/screenshot-modal';
import { PlushieGridComponent } from './plushie-grid/plushie-grid';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ScreenshotModal, PlushieGridComponent, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  plushies: { [category: string]: TradeItemColumn[] } = {};
  stickers: { [category: string]: TradeItemColumn[] } = {};
  artifacts: { [category: string]: TradeItemColumn[] } = {};

  currentItems: { [category: string]: TradeItemColumn[] } = {};
  currentType: 'plushies' | 'stickers' | 'artifacts' = 'plushies';

  isScreenshotOpen = false;
  filterText: string = '';

  ngOnInit() {
    this.plushies = this.loadItems(plushieData as TradeItem[], setsData as TradeItemSet[]);
    this.stickers = this.loadItems(stickerData as TradeItem[]); // no sets
    this.artifacts = this.loadItems(artifactData as TradeItem[]); // no sets

    this.switchItems('plushies');
  }

  private loadItems(data: TradeItem[], sets: TradeItemSet[] = []): { [category: string]: TradeItemColumn[] } {
    const byId = new Map<number, TradeItem>();
    data.forEach(p => byId.set(p.id, p));

    const items: { [category: string]: TradeItemColumn[] } = {};

    // Add sets first
    sets.forEach(set => {
      items[set.category] = items[set.category] ?? [];

      const anyCard: TradeItem = {
        id: 70000 + set.id * 2,
        category: set.category,
        name: `Any (${set.name})`,
        image: set.image,
        status: null,
        quantity: 1
      };
      const fullSetCard: TradeItem = {
        id: 70000 + set.id * 2 + 1,
        category: set.category,
        name: `Full Set (${set.name})`,
        image: set.image,
        status: null,
        quantity: 1
      };

      const members = set.members
        .map(id => byId.get(id))
        .filter((p): p is TradeItem => !!p);

      const column: TradeItemColumn = {
        type: 'set',
        setName: set.name,
        cards: [anyCard, fullSetCard, ...members]
      };

      items[set.category].push(column);
    });

    // Add items not in any set as orphans
    const setMemberIds = new Set(sets.flatMap(s => s.members));
    data.forEach(p => {
      if (!setMemberIds.has(p.id)) {
        items[p.category] = items[p.category] ?? [];

        // Find or create orphan column
        let orphanColumn = items[p.category].find(c => c.type === 'orphans');
        if (!orphanColumn) {
          orphanColumn = { type: 'orphans', setName: 'Unassigned', cards: [] };
          items[p.category].unshift(orphanColumn);
        }

        orphanColumn.cards.push(p);
      }
    });

    return items;
  }

  switchItems(type: 'plushies' | 'stickers' | 'artifacts') {
    this.currentType = type;
    if (type === 'plushies') this.currentItems = this.plushies;
    else if (type === 'stickers') this.currentItems = this.stickers;
    else if (type === 'artifacts') this.currentItems = this.artifacts;
  }

  get havePlushies(): TradeItem[] {
    return Object.values(this.currentItems)
      .flatMap(cols => cols.flatMap(c => c.cards))
      .filter(p => p.status === 'have');
  }

  get wantPlushies(): TradeItem[] {
    return Object.values(this.currentItems)
      .flatMap(cols => cols.flatMap(c => c.cards))
      .filter(p => p.status === 'want');
  }

  toggleScreenshot() {
    this.isScreenshotOpen = true;
  }
}
