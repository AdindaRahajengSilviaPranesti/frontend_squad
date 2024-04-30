import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Apex Chart
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule  } from 'ng2-charts';
import { NgxEchartsModule } from 'ngx-echarts';

// Component
import { CapabilityRoutingModule } from "./capability-routing.module";
import { Al4Component } from "./al4/al4.component";

@NgModule({
  declarations: [
    Al4Component
  ],
  imports: [
    CapabilityRoutingModule,
    CommonModule,
    NgApexchartsModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    })
  ]
})
export class CapabilityModule { }
