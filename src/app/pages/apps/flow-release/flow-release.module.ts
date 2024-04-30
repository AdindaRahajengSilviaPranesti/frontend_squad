import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipModule, NgbProgressbarModule, NgbDropdownModule, NgbNavModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

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
import { FlowReleaseRoutingModule } from './flow-release-routing.module';
import { FlowReleaseOc1Component } from './flow-release-oc1/flow-release-oc1.component';
import { FlowReleaseOc2Component } from './flow-release-oc2/flow-release-oc2.component';
import { FlowReleaseFsbComponent } from './flow-release-fsb/flow-release-fsb.component';
import { GrafikReleaseComponent } from './grafik-release/grafik-release.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    FlowReleaseOc1Component,
    FlowReleaseOc2Component,
    FlowReleaseFsbComponent,
    GrafikReleaseComponent
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
    FlowReleaseRoutingModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FlowReleaseModule { 
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
