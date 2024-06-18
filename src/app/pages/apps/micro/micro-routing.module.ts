import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// SWAB
import { SwabComponent } from "./swab/swab.component";
import { WaterComponent } from "./water/water.component";
import { FgComponent } from "./fg/fg.component";
// END SWAB


const routes: Routes = [
  {
    path: "swab",
    component:SwabComponent
  },
  {
    path: "water",
    component:WaterComponent
  },
  {
    path: "fg",
    component:FgComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MicroRoutingModule { }
