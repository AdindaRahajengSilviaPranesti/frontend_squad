import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FlowReleaseService } from 'src/app/services/flowRelease/flow-release.service';


@Component({
  selector: 'app-flow-release-oc1',
  templateUrl: './flow-release-oc1.component.html',
  styleUrls: ['./flow-release-oc1.component.scss']
})
export class FlowReleaseOc1Component {

  constructor(
    private appService: FlowReleaseService,
    private spinner: NgxSpinnerService
    ) { }

  dataOcI1: any = [];

  ngOnInit(){
    this.spinner.show();
    this.appService.getFlowReleaseOCI1().subscribe((res: any) => {
      console.log(res);
      
      this.dataOcI1 = res.data;
      console.log(this.dataOcI1);
      this.spinner.hide();

    });
  }



}
