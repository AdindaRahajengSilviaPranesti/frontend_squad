import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbToastModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountToModule } from 'angular-count-to';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { AppsModule } from "./apps/apps.module";
import { GenbaComponent } from './genba/genba.component';
import { InpectionOverviewComponent } from './inpection-overview/inpection-overview.component';
import { ReleaseOverviewComponent } from './release-overview/release-overview.component';
import { MarketVisitOverviewComponent } from './market-visit-overview/market-visit-overview.component';
import { RadarVisualComponent } from './radar-visual/radar-visual.component';
import { CapaTrackerVisualComponent } from './capa-tracker-visual/capa-tracker-visual.component';
import { GenbaOverviewComponent } from './genba-overview/genba-overview.component';
import { ReagenStockComponent } from './reagen-stock/reagen-stock.component';
import { ProcessMonitoringComponent } from './process-monitoring/process-monitoring.component';
import { CleaningSanitationComponent } from './cleaning-sanitation/cleaning-sanitation.component';
import { RedAreaMonitoringComponent } from './red-area-monitoring/red-area-monitoring.component';
import { MikroFinishgoodComponent } from './mikro-finishgood/mikro-finishgood.component';
import { InprocessControlComponent } from './inprocess-control/inprocess-control.component';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { SupplierEvaluationComponent } from './capa-tracker-visual/supplier-evaluation/supplier-evaluation.component';
import { ComplaintReportComponent } from './capa-tracker-visual/complaint-report/complaint-report.component';

@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    GenbaComponent,
    InpectionOverviewComponent,
    ReleaseOverviewComponent,
    MarketVisitOverviewComponent,
    RadarVisualComponent,
    CapaTrackerVisualComponent,
    GenbaOverviewComponent,
    ReagenStockComponent,
    ProcessMonitoringComponent,
    CleaningSanitationComponent,
    RedAreaMonitoringComponent,
    MikroFinishgoodComponent,
    InprocessControlComponent,
    DatePickerComponent,
    SupplierEvaluationComponent,
    ComplaintReportComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    FlatpickrModule.forRoot(),
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    NgxUsefulSwiperModule,
    LightboxModule,
    DashboardsModule,
    AppsModule,
    NgbPaginationModule,
  ],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
