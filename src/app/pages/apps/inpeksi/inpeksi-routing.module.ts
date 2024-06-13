import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { RejectionOci1Component } from './rejection-oci1/rejection-oci1.component';
import { RejectionOci2Component } from './rejection-oci2/rejection-oci2.component';
import { RejectionFSBComponent } from './rejection-fsb/rejection-fsb.component';

const routes: Routes = [
  {
    path: "rejection-oci1",
    component: RejectionOci1Component
  },
  {
    path: "rejection-oci2",
    component: RejectionOci2Component
  },
  {
    path: "rejection-fsb",
    component: RejectionFSBComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InpeksiRoutingModule {}
