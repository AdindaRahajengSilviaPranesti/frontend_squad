import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Chart
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule  } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';

import { FlatpickrModule } from 'angularx-flatpickr';
import { NgSelectModule } from '@ng-select/ng-select';

import { CapabilityRoutingModule } from './capability-routing.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgChartsModule,
    FlatpickrModule.forRoot(),
    NgSelectModule,
    CapabilityRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CapabilityModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
 }
