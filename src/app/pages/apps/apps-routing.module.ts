import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { WidgetsComponent } from "./widgets/widgets.component";
import { FlowReleaseFsbComponent } from './flow-release/flow-release-fsb/flow-release-fsb.component';
import { FlowReleaseOc1Component } from './flow-release/flow-release-oc1/flow-release-oc1.component';
import { FlowReleaseOc2Component } from './flow-release/flow-release-oc2/flow-release-oc2.component';
import { GrafikReleaseComponent } from './flow-release/grafik-release/grafik-release.component';
import { RejectionFSBComponent } from './inpeksi/rejection-fsb/rejection-fsb.component';
import { RejectionOci1Component } from './inpeksi/rejection-oci1/rejection-oci1.component';
import { RejectionOci2Component } from './inpeksi/rejection-oci2/rejection-oci2.component';
import { PendingTaskCalibrationComponent } from './calibration/pending-task-calibration/pending-task-calibration.component';
import { ReportCalibrationComponent } from './calibration/report-calibration/report-calibration.component';
import { ResultCalibrationComponent } from './calibration/result-calibration/result-calibration.component';
import { DataAnalisisBpdComponent } from './data-analisis-bpd/data-analisis-bpd.component';
import { PrintCalibrationComponent } from './calibration/print-calibration/print-calibration.component';

const routes: Routes = [
  {
    path: "widgets",
    component: WidgetsComponent
  },
  {
    path: "flow-release-fsb",
    component: FlowReleaseFsbComponent
  },
  {
    path: "flow-release-oc1",
    component: FlowReleaseOc1Component
  },
  {
    path: "flow-release-oc2",
    component: FlowReleaseOc2Component
  },
  {
    path: "grafik-release",
    component: GrafikReleaseComponent
  },
  {
    path: "rejection-fsb",
    component: RejectionFSBComponent
  },
  {
    path: "rejection-oci1",
    component: RejectionOci1Component
  },
  {
    path: "rejection-oci2",
    component: RejectionOci2Component
  },
  {
    path: "pending-task-calibration",
    component: PendingTaskCalibrationComponent
  },
  {
    path: "report-calibration",
    component: ReportCalibrationComponent
  },
  {
    path: "result-calibration",
    component: ResultCalibrationComponent
  },
  {
    path: "data-analisis-bpd",
    component: DataAnalisisBpdComponent
  },
  {
    path: "print-calibration",
    component: PrintCalibrationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
