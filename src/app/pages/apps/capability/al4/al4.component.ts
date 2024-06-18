import { Component, OnInit } from '@angular/core';
import { restApiService } from 'src/app/core/services/rest-api.service';
import * as moment from 'moment';
import { ChartComponent } from "ng-apexcharts";

@Component({
  selector: 'app-al4',
  templateUrl: './al4.component.html',
  styleUrls: ['./al4.component.scss']
})
export class Al4Component {
  isFilter = false;
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
  dataColumn: any = {};
  dataLine: any;

  splineAreaChart: any;
  basicLineChart: any;
  chart!: ChartComponent;
  constructor(public restApiServices: restApiService) {
    this.splineAreaChart = {
      series: [],
      chart: {
        height: 350,
        type: "area"
      },
    };
    this.basicLineChart = {
      series: [],
      chart: {
        height: 350,
        type: "line"
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
    this.isFilter = true;
    let form = {
      jenis_uji: this.selectedJenisPengujian,
      start_date: this.obj.start,
      end_date: this.obj.end
    }
    console.log('submit form',form);

    this.restApiServices.dataTable(form)
    .subscribe(data => {
      this.dataTable = data
      console.log('tabel', this.dataTable);
      this.dataColumn = {}

      this.dataTable.data.forEach((item: any) => {
        if (this.dataColumn[item.value]) {
          this.dataColumn[item.value].total++;
        } else {
          this.dataColumn[item.value] = { value: item.value, total: 1 };
        }
      });

      console.log('column', this.dataColumn);

    }, (error: any) => {
      console.error(error);
    });

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

        if (this.dataColumn) {
          console.log('mean',this.dataColumn);
          let countY = Object.values(this.dataColumn).map((item: any) => {
            return item.total
            
          })
          let countX = Object.values(this.dataColumn).map((item: any) => {
            return item.value
            
          })

          console.log('countY',countY);
          let meanY = this.calculateAvg(countY)
          let meanX = this.calculateMean(countX)
          console.log('mean',meanY);
          
          this._splineAreaChart(this.lslValue, this.uslValue, meanUslLsl, this.minValue, this.maxValue, meanY, meanX);

        }

        if (this.dataLine) {
          this._basicLineChart(this.lslValue, this.uslValue, this.dataLine.data)
        }

      }, (error: any) => {
        console.error(error);
      });


    this.restApiServices.lineCapability(form)
      .subscribe(data => {
        console.log('line', data);
        this.dataLine = data

      }, (error: any) => {
        console.log(error);
      })

  }

  onChangeDate(event: any) {
    this.obj.start = moment(event.target._flatpickr.selectedDates[0]).format('Y-MM-DD')
    this.obj.end = moment(event.target._flatpickr.selectedDates[1]).format('Y-MM-DD')

  }

  onChangeJenisUji(event: any) {
    this.selectedJenisPengujian = event.jenis_uji
  }

  private _splineAreaChart(lsl: any, usl: any, meanUslLsl: any, min: any, max: any, meanY: any, meanX: any) {
    this.splineAreaChart = {
      series: [
        {
          name: 'Process Width (Ideal)',
          type: "area",
          data: [{
            x: +lsl, //lsl
            y: 0
          }, {
            x: +meanUslLsl, // mean dari lsl usl
            y: +meanUslLsl // mean
          }, {
            x: +usl, //usl
            y: 0
          }],
        },
        {
          name: 'Process Width (Actual)',
          type: "area",
          data: [
            {
              x: this.getMinValue(Object.values(this.dataColumn).map((item: any) => {
                return item.value
                
              })), //min
              y: 0
            },
            {
              x: +meanX, // mean
              y: +meanY // mean
            },
            {
              x: this.getMaxValue(Object.values(this.dataColumn).map((item: any) => {
                return item.value
                
              })), //max
              y: 0
            }
          ],
        },
        {
          name: "Histograph",
          type: "column",
          data: Object.values(this.dataColumn).map((item: any) => {
            return {
              x: item.value,
              y: item.total
            }
          })
        },
      ],
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

  private _basicLineChart(lsl: any, usl: any, data: any) {
    console.log('data', data);
    console.log('data lsl', lsl);
    console.log('data usl', usl);

    this.basicLineChart = {
      series: [{
        name: 'Value',
        data: data.map((item: any) => item.value)
      }],
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: true
        },
        toolbar: {
          show: true
        }
      },
      annotations: {
        yaxis: [
          {
            y: +usl,
            y2: +usl+10,
            fillColor: '#FF644C',
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#FF644C"
              },
              orientation: "vertical",
              text: "USL - " + usl
            }
          },
          {
            y: +lsl,
            y2: +lsl-10,
            fillColor: '#FF644C',
            strokeDashArray: 0,
            borderColor: "#775DD0",
            label: {
              borderColor: "#775DD0",
              style: {
                color: "#fff",
                background: "#FF644C"
              },
              orientation: "vertical",
              text: "lSL - " + lsl
            }
          },
        ]
      },
      markers: {
        size: 4,
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'straight'
      },
      title: {
        text: 'Data Trends',
        align: 'left',
        style: {
          fontWeight: 500,
        },
      },
      xaxis: {
        categories: data.map((item: any) => item.metric),
      },
      yaxis: {
        min: +lsl-10,
        max: +usl+10
      }
    };
  }


  calculateMean(data:any[]): GLfloat {
    // Mendapatkan nilai minimum dari array
    let minValue = Math.min(...data);

    // Mendapatkan nilai maksimum dari array
    let maxValue = Math.max(...data);

    // Menghitung rata-rata
    let result = (minValue + maxValue) / 2;

    return parseFloat(result.toFixed(3));
  }
  
  calculateAvg(data:any[]): GLfloat {
    // Hitung jumlah semua elemen dalam array
    let sum = data.reduce((acc, val) => acc + val, 0);

    // Hitung jumlah elemen dalam array
    let count = data.length;

    // Hitung rata-rata
    let average = sum / count;

    return parseFloat(average.toFixed(3));
  }

  getMinValue(data:any[]){
    let minValue = Math.min(...data);
    return minValue;
  }
  
  getMaxValue(data:any[]){
    let maxValue = Math.max(...data);
    return maxValue;
  }
}
