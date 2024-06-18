import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { PendingTaskCalibrationComponent } from './pending-task-calibration/pending-task-calibration.component';
import { ReportCalibrationComponent } from './report-calibration/report-calibration.component';
import { ResultCalibrationComponent } from './result-calibration/result-calibration.component';
import { PrintCalibrationComponent } from './print-calibration/print-calibration.component';

import { DashboardCalibrationComponent } from './dashboard-calibration/dashboard-calibration.component';

const routes: Routes = [
  {
    path: "pending-task-calibration",
    component: PendingTaskCalibrationComponent
  },
  {
    path: "report-calibration",
    component: ReportCalibrationComponent
  },
  {
    path: "print-calibration",
    component: PrintCalibrationComponent
  },
  {
    path: "result-calibration",
    component: ResultCalibrationComponent
  },
  {
    path: "dashboard-calibration-skb",
    component: DashboardCalibrationComponent
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CalibrationRoutingModule {}
