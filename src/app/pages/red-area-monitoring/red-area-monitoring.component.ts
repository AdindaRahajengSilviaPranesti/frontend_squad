import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-red-area-monitoring',
  templateUrl: './red-area-monitoring.component.html',
  styleUrls: ['./red-area-monitoring.component.scss']
})
export class RedAreaMonitoringComponent implements OnInit  {

  basicChart: any;
  gradientDonutChart: any;
  gradientDonutChart2: any;
  gradientDonutChart3: any;
  gradientDonutChart4: any;


  constructor(private restApiService: restApiService, private fb: UntypedFormBuilder, private spinner: NgxSpinnerService) {
  }

  ngOnInit(): void {
    const today = new Date();
    
    
    // Format the date as YYYY-MM-DD (required format for input type date)
    const formattedDate = today.toISOString().split('T')[0];
    
    // this.DateSelected = formattedDate;
    this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]');
    this._gradientDonutChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart2('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart3('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart4('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);

      // Chart Colors Set
    
      
  
  }

  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }
  //CHART RED&YELLOW AREA
  private _basicChart(colors: any, keterangan = [], cp = [], cpk = []) {
    colors = this.getChartColorsArray(colors);
    this.basicChart = {
      series: [
        {
          name: "CP",
          data: cp,
        },
        {
          name: "CPK",
          data: cpk,
        },
      ],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "45%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: ['#424874', '#F6995C'],
      xaxis: {
        categories: keterangan
      },
      grid: {
        borderColor: "#f1f1f1",
      },
      fill: {
        opacity: 1,
      },

      
    };
  }

//OC LINE --> ROOT CAUSE AREA OC
  private _gradientDonutChart(colors: any, s: number, e: number) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart = {
      series: [s, e],
      chart: {
        height: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
      },
      title: {
        style: {
          fontWeight: 500,
        },
      },
      colors: colors,
    };
  }

  private _gradientDonutChart2(colors: any, s: number, e: number) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart2 = {
      series: [s, e],
      chart: {
        height: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
      },
      title: {
        style: {
          fontWeight: 500,
        },
      },
      colors: colors,
    };
  }

  private _gradientDonutChart3(colors: any, s: number, e: number) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart3 = {
      series: [s, e],
      chart: {
        height: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
      },
      title: {
        style: {
          fontWeight: 500,
        },
      },
      colors: colors,
    };
  }

  private _gradientDonutChart4(colors: any, s: number, e: number) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart4 = {
      series: [s, e],
      chart: {
        height: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
      },
      title: {
        style: {
          fontWeight: 500,
        },
      },
      colors: colors,
    };
  }



}
