import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule, NgbProgressbarModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { QRCodeModule } from 'angularx-qrcode';


// Feather Icon
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';
// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';
// File Uploads
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
// Ng Select
import { NgSelectModule } from '@ng-select/ng-select';
// Load Icon
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';
// Component Pages
import { CalibrationRoutingModule } from './calibration-routing.module';
import { PendingTaskCalibrationComponent } from './pending-task-calibration/pending-task-calibration.component';
import { ReportCalibrationComponent } from './report-calibration/report-calibration.component';
import { ResultCalibrationComponent } from './result-calibration/result-calibration.component';
import { PrintCalibrationComponent } from './print-calibration/print-calibration.component';
import { DashboardCalibrationComponent } from './dashboard-calibration/dashboard-calibration.component';


const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
  PendingTaskCalibrationComponent,
  ReportCalibrationComponent,
  ResultCalibrationComponent,
  PrintCalibrationComponent,
  DashboardCalibrationComponent,

  ],

  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgbProgressbarModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbPaginationModule,
    FeatherModule.pick(allIcons),
    SimplebarAngularModule,
    CKEditorModule,
    FlatpickrModule,
    DropzoneModule,
    NgSelectModule,
    CalibrationRoutingModule,
    QRCodeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CalibrationModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}