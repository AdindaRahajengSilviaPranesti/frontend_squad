import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Component pages
import { DashboardComponent } from "./dashboards/dashboard/dashboard.component";
import { GenbaComponent } from './genba/genba.component';
import { InpectionOverviewComponent } from './inpection-overview/inpection-overview.component';
import { MarketVisitOverviewComponent } from './market-visit-overview/market-visit-overview.component';
import { ReleaseOverviewComponent } from './release-overview/release-overview.component';
import { RadarComponent } from './charts/Apexcharts/radar/radar.component';
import { CapaTrackerVisualComponent } from './capa-tracker-visual/capa-tracker-visual.component';
import { RadarVisualComponent } from './radar-visual/radar-visual.component';
import { GenbaOverviewComponent } from './genba-overview/genba-overview.component';
import { ReagenStockComponent } from './reagen-stock/reagen-stock.component';
import { ProcessMonitoringComponent } from './process-monitoring/process-monitoring.component';
import { CleaningSanitationComponent } from './cleaning-sanitation/cleaning-sanitation.component';
import { RedAreaMonitoringComponent } from './red-area-monitoring/red-area-monitoring.component';
import { MikroFinishgoodComponent } from './mikro-finishgood/mikro-finishgood.component';
import { InprocessControlComponent } from './inprocess-control/inprocess-control.component';
import { ComplaintReportComponent } from './capa-tracker-visual/complaint-report/complaint-report.component';
import { SupplierEvaluationComponent } from './capa-tracker-visual/supplier-evaluation/supplier-evaluation.component';


const routes: Routes = [
    {
        path: "",
        component: DashboardComponent
    },
    {
      path: '', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule)
    },
    {
      path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)
    },
    {
      path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsModule)
    },
    {
      path: "genba",
      component: GenbaComponent
    },
    {
      path: "inpection-overview",
      component: InpectionOverviewComponent
    },
    {
      path: "market-visit-overview",
      component: MarketVisitOverviewComponent
    },
    {
      path: "release-overview",
      component: ReleaseOverviewComponent
    },
    {
      path: "radar-visual",
      component: RadarVisualComponent
    },
    {
      path: "capa-tracker-visual",
      component: CapaTrackerVisualComponent
    },
    {
      path: "genba-overview",
      component: GenbaOverviewComponent
    },
    {
      path: "reagen-stock",
      component: ReagenStockComponent
    },
    {
      path: "process-monitoring",
      component: ProcessMonitoringComponent
    },
    {
      path: "cleaning-sanitation",
      component: CleaningSanitationComponent
    },
    {
      path: "red-area-monitoring",
      component: RedAreaMonitoringComponent
    },
    {
      path: "mikro-finishgood",
      component: MikroFinishgoodComponent
    },
    {
      path: "inprocess-control",
      component: InprocessControlComponent
    },
    {
      path: "complaint-report",
      component: ComplaintReportComponent
    },
    {
      path: "supplier-evaluation",
      component: SupplierEvaluationComponent
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
