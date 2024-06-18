import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// AL4
import { Al4Component } from "./al4/al4.component";
// END AL4

const routes: Routes = [
    {
      path: "al4",
      component:Al4Component
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class CapabilityRoutingModule { }