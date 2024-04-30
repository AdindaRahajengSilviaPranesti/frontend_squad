import { Component, OnInit} from '@angular/core';
import { restApiService } from 'src/app/core/services/rest-api.service';

@Component({
  selector: 'app-dashboard-calibration',
  templateUrl: './dashboard-calibration.component.html',
  styleUrls: ['./dashboard-calibration.component.scss']
})
export class DashboardCalibrationComponent implements OnInit {
  public equipmentData: any;

  constructor( public restApiServices: restApiService ) {
    
  }

  ngOnInit(): void {
    this.restApiServices.getEquipment()
    .subscribe(data=>{
      this.equipmentData = data.data[0]
      
    }, (error: any) => {
      console.error(error);
    });
  }

  
}
