import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroRoutingModule } from './micro-routing.module';
import { SwabComponent } from './swab/swab.component';
import { CountToModule } from 'angular-count-to';
import { FlatpickrModule } from 'angularx-flatpickr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Chart
import { NgApexchartsModule } from 'ng-apexcharts';
import { WaterComponent } from './water/water.component';
import { FgComponent } from './fg/fg.component';

@NgModule({
  declarations: [
    SwabComponent,
    WaterComponent,
    FgComponent
  ],
  imports: [
    CommonModule,
    MicroRoutingModule,
    NgApexchartsModule,
    CountToModule,
    FlatpickrModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MicroModule { }
