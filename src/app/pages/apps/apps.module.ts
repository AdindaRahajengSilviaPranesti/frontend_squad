import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxSpinnerModule } from 'ngx-spinner';
import { format, addDays } from 'date-fns';


import { NgbTooltipModule, NgbDropdownModule, NgbAccordionModule, NgbProgressbarModule, NgbNavModule, NgbPaginationModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';
// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Counter
import { CountToModule } from 'angular-count-to';
// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

//  Drag and drop
import { DndModule } from 'ngx-drag-drop';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

// NG2 Search Filter
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';

// Component Pages
import { AppsRoutingModule } from "./apps-routing.module";
import { SharedModule } from '../../shared/shared.module';
import { WidgetsComponent } from './widgets/widgets.component';

// Mask
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask, IConfig } from 'ngx-mask';

import { DatePipe } from '@angular/common';

import { SortByPipe } from '../apps/sort-by.pipe';

// Swiper Slider
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { PendingTaskCalibrationComponent } from './calibration/pending-task-calibration/pending-task-calibration.component';
import { ReportCalibrationComponent } from './calibration/report-calibration/report-calibration.component';
import { ResultCalibrationComponent } from './calibration/result-calibration/result-calibration.component';
import { DataAnalisisBpdComponent } from './data-analisis-bpd/data-analisis-bpd.component';
import { PrintCalibrationComponent } from './calibration/print-calibration/print-calibration.component';


import { RejectionFSBComponent } from './inpeksi/rejection-fsb/rejection-fsb.component';
import { RejectionOci1Component } from './inpeksi/rejection-oci1/rejection-oci1.component';
import { RejectionOci2Component } from './inpeksi/rejection-oci2/rejection-oci2.component';
import { FlowReleaseFsbComponent } from './flow-release/flow-release-fsb/flow-release-fsb.component';
import { FlowReleaseOc1Component } from './flow-release/flow-release-oc1/flow-release-oc1.component';
import { FlowReleaseOc2Component } from './flow-release/flow-release-oc2/flow-release-oc2.component';
import { GrafikReleaseComponent } from './flow-release/grafik-release/grafik-release.component';

@NgModule({
  declarations: [
    WidgetsComponent,
    SortByPipe,
    PendingTaskCalibrationComponent,
    ReportCalibrationComponent,
    ResultCalibrationComponent,
    PrintCalibrationComponent,
    DataAnalisisBpdComponent,
    RejectionFSBComponent,
    RejectionOci1Component,
    RejectionOci2Component,
    FlowReleaseFsbComponent,
    FlowReleaseOc1Component,
    FlowReleaseOc2Component,
    GrafikReleaseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbAccordionModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbPaginationModule,
    NgbCollapseModule,
    FeatherModule.pick(allIcons),
    FullCalendarModule,
    FlatpickrModule.forRoot(),
    SimplebarAngularModule,
    CKEditorModule,
    CountToModule,
    NgApexchartsModule,
    LeafletModule,
    AppsRoutingModule,
    SharedModule,
    PickerModule,
    DndModule,
    NgSelectModule,
    DragDropModule,
    MatTableModule,
    Ng2SearchPipeModule,
    NgxUsefulSwiperModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    QRCodeModule,
    NgxSpinnerModule,
    NgxSpinnerModule.forRoot(),
  ],
  providers: [
    provideNgxMask(),
    DatePipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppsModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}


