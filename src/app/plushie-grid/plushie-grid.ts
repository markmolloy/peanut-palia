

// import { Component, Input, OnInit } from '@angular/core';
// import { Plushie } from '../../models/plushie.model';
// import { PlushieCardComponent } from '../plushie-card/plushie-card';

// @Component({
//   selector: 'app-plushie-grid',
//   imports: [PlushieCardComponent],
//   templateUrl: './plushie-grid.html',
//   styleUrl: './plushie-grid.scss',
// })
// export class PlushieGridComponent implements OnInit {
//   @Input() plushies: Plushie[] = [];

//   // Organize plushies by category and subcategory
//   organizedPlushies: { [category: string]: { [subcategory: string]: Plushie[] } } = {};

//   ngOnInit() {
//     this.organizedPlushies = {};
//     this.plushies.forEach(plushie => {
//       if (!this.organizedPlushies[plushie.category]) {
//         this.organizedPlushies[plushie.category] = {};
//       }
//       if (!this.organizedPlushies[plushie.category][plushie.subcategory]) {
//         this.organizedPlushies[plushie.category][plushie.subcategory] = [];
//       }
//       // Set defaults
//       plushie.status = plushie.status ?? null;
//       plushie.quantity = plushie.quantity ?? 1;

//       this.organizedPlushies[plushie.category][plushie.subcategory].push(plushie);
//     });
//   }
// }

// plushie-grid.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { TradeItem, TradeItemColumn } from '../../models/trade-item.model';
import { PlushieCardComponent } from '../plushie-card/plushie-card';
import { CommonModule } from '@angular/common';  // <-- import CommonModule

@Component({
  selector: 'app-plushie-grid',
  standalone: true,
  templateUrl: './plushie-grid.html',
  styleUrls: ['./plushie-grid.scss'],
  imports: [PlushieCardComponent, CommonModule]
})
export class PlushieGridComponent{
  @Input() plushies: { [category: string]: TradeItemColumn[] } = {};
  @Input() filterText = '';

  displayColumns: { [category: string]: TradeItemColumn[] } = {};
  

  ngOnInit() {
    this.updateDisplayColumns();
  }

  ngOnChanges() {
    this.updateDisplayColumns();
  }

  hasNoSets(category: string): boolean {
    return this.displayColumns[category]?.every(col => col.type !== 'set') ?? false;
  }

  updateDisplayColumns() {
    const filter = this.filterText.toLowerCase();
    this.displayColumns = {};

    for (const category in this.plushies) {
      const cols = this.plushies[category]
        .map(col => ({
          ...col,
          cards: col.cards.filter(p => !filter || p.name.toLowerCase().includes(filter))
        }))
        .filter(col => col.cards.length > 0); // remove empty columns

      if (cols.length > 0) {
        this.displayColumns[category] = cols;
      }
    }
  }
}