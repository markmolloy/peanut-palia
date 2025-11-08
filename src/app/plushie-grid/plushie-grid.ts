

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
import { Plushie } from '../../models/plushie.model';
import { PlushieCardComponent } from '../plushie-card/plushie-card';
import { CommonModule } from '@angular/common';  // <-- import CommonModule

@Component({
  selector: 'app-plushie-grid',
  standalone: true,
  templateUrl: './plushie-grid.html',
  styleUrls: ['./plushie-grid.scss'],
  imports: [PlushieCardComponent, CommonModule]
})
export class PlushieGridComponent implements OnInit {
  @Input() plushies: Plushie[] = [];
  organizedPlushies: { [category: string]: { [subcategory: string]: Plushie[] } } = {};

  ngOnInit() {
    this.organizedPlushies = {};
    console.log(this.plushies)

    // Organize plushies
    this.plushies.forEach(plushie => {
      if (plushie.name.toLowerCase() === 'any') return; // skip any plushies from JSON

      if (!this.organizedPlushies[plushie.category]) {
        this.organizedPlushies[plushie.category] = {};
      }
      if (!this.organizedPlushies[plushie.category][plushie.subcategory]) {
        this.organizedPlushies[plushie.category][plushie.subcategory] = [];
      }

      plushie.status = plushie.status ?? null;
      plushie.quantity = plushie.quantity ?? 1;

      this.organizedPlushies[plushie.category][plushie.subcategory].push(plushie);
    });

    
  }
}
