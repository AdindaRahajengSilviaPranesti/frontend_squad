import { Component, OnInit } from '@angular/core';
import { restApiService } from 'src/app/core/services/rest-api.service';
import * as moment from 'moment';
import { ChartComponent } from "ng-apexcharts";

@Component({
  selector: 'app-al4',
  templateUrl: './al4.component.html',
  styleUrls: ['./al4.component.scss']
})
export class Al4Component implements OnInit {
  jenisPengujianData: any;
  selectedJenisPengujian: any;
  obj = {
    start: '',
    end: ''
  }

  meanValue: any;
  minValue: any;
  maxValue: any;
  rangeValue: any;
  lslValue: any;
  uslValue: any;
  stdDevValue: any;
  cpValue: any;
  cpkValue: any;
  dataTable: any;

  splineAreaChart: any;
  chart!: ChartComponent;
  constructor(public restApiServices: restApiService) {
    this.splineAreaChart = {
      series: [],
      chart: {
        height: 350,
        type: "area"
      },
    };
  }

  ngOnInit(): void {
    // this._splineAreaChart(this.lslValue, this.uslValue, (this.lslValue+this.uslValue)/2, this.minValue, this.maxValue, this.meanValue);
    this.restApiServices.jenisPengujian()
      .subscribe(data => {
        this.jenisPengujianData = data.data

      }, (error: any) => {
        console.error(error);
      });
  }

  onSubmit() {
    let form = {
      jenis_uji: this.selectedJenisPengujian,
      start_date: this.obj.start,
      end_date: this.obj.end
    }
    console.log(form);


    this.restApiServices.countCapability(form)
      .subscribe(data => {
        this.lslValue = parseFloat(data.data[0].lsl).toFixed(2)
        this.uslValue = parseFloat(data.data[0].usl).toFixed(2)
        this.meanValue = parseFloat(data.data[0].mean).toFixed(2)
        this.minValue = parseFloat(data.data[0].min).toFixed(2)
        this.maxValue = parseFloat(data.data[0].max).toFixed(2)
        this.rangeValue = parseFloat(data.data[0].range).toFixed(2)
        this.stdDevValue = parseFloat(data.data[1].stdev).toFixed(2)
        this.cpValue = parseFloat(data.data[1].cp).toFixed(2)
        this.cpkValue = parseFloat(data.data[1].cpk).toFixed(2)

        let meanUslLsl = (parseFloat(this.lslValue) + parseFloat(this.uslValue)) / 2

        this._splineAreaChart(this.lslValue, this.uslValue, meanUslLsl, this.minValue, this.maxValue, this.meanValue);

      }, (error: any) => {
        console.error(error);
      });


    this.restApiServices.dataTable(form)
      .subscribe(data => {
        this.dataTable = data
        console.log(this.dataTable);

      }, (error: any) => {
        console.error(error);
      });

  }

  onChangeDate(event: any) {
    this.obj.start = moment(event.target._flatpickr.selectedDates[0]).format('Y-MM-DD')
    this.obj.end = moment(event.target._flatpickr.selectedDates[1]).format('Y-MM-DD')

  }

  onChangeJenisUji(event: any) {
    this.selectedJenisPengujian = event.jenis_uji
  }

  private _splineAreaChart(lsl: any, usl: any, meanUslLsl: any, min: any, max: any, mean: any) {
    this.splineAreaChart = {
      series: [{
        name: 'Process Width (Ideal)',
        data: [{
          x: +lsl, //lsl
          y: 0
        }, {
          x: +meanUslLsl, // mean dari lsl usl
          y: +mean // mean
        }, {
          x: +usl, //usl
          y: 0
        }],
      }, {
        name: 'Process Width (Actual)',
        data: [
          {
            x: +min, //min
            y: 0
          },
          {
            x: +mean, // mean
            y: +mean // mean
          },
          {
            x: +max, //max
            y: 0
          }
        ],
      }],
      annotations: {
        xaxis: [
          {
            x: +lsl,
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              orientation: "vertical",
              text: "LSL - " + lsl
            }
          },
          {
            x: +usl,
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#775DD0"
              },
              orientation: "vertical",
              text: "USL - " + usl
            }
          },
          {
            x: +meanUslLsl,
            strokeDashArray: 0,
            borderColor: "#FEB019",
            label: {
              borderColor: "#FEB019",
              style: {
                color: "#fff",
                background: "#FEB019"
              },
              orientation: "vertical",
              text: "Ideal - " + meanUslLsl
            }
          }
        ]
      },
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      }
    };
  }
}
