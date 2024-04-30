import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { FlowReleaseOc1Component } from './flow-release-oc1/flow-release-oc1.component';
import { FlowReleaseOc2Component } from './flow-release-oc2/flow-release-oc2.component';
import { FlowReleaseFsbComponent } from './flow-release-fsb/flow-release-fsb.component';
import { GrafikReleaseComponent } from './grafik-release/grafik-release.component';


const routes: Routes = [
  {
    path: "flow-release-oc1",
    component: FlowReleaseOc1Component
  },
  {
    path: "flow-release-oc2",
    component: FlowReleaseOc2Component
  },
  {
    path: "flow-release-fsb",
    component: FlowReleaseFsbComponent
  },
  {
    path: "grafik-release",
    component: GrafikReleaseComponent
  }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlowReleaseRoutingModule {}
