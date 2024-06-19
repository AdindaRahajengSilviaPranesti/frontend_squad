import { Component, OnInit, ElementRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { isNull } from 'lodash';
import { Grid } from 'gridjs';
import * as moment from 'moment';
import { NgTemplateOutlet, NgIf, NgClass } from '@angular/common'; 

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
  
  currentYear = new Date().getFullYear();
  table = [
    "tr_swab_al4_d",  // M/C FSB
      "tr_swab_can_d",  // OC1
      "tr_swab_enmix_d",// ENV FSB
      "tr_swab_oc3_d",  // ENV PS
      "tr_swab_pet_d",  // OC2
  ];
  donutCategory: any;
  allRed: any;
  allYellow: any;
  countRed: any;
  countYellow: any;
  target: any;
  ytdArea: any;
  chartBarMonitoringYtd: any;
  
  selectedLineSwab: any;
  selectedMicroSwab: any;
  dateSelectedSwab = {
    start: '',
    end: ''
  }
  areaSwab: any;
  selectedAreaSwab: any;
  
  resultSwab: any;
  resultSwabLineChart: any = {
    series: [],
    chart: {},
    xaxis: {},
    stroke: {},
    colors: [],
    dataLabels: {},
    legend: {},
    markers: {},
    grid: {},
    yaxis: {},
    title: {}
  };
  resultNullSwabLineChart: any = {
    series: [],
    chart: {},
    xaxis: {},
    stroke: {},
    colors: [],
    dataLabels: {},
    legend: {},
    markers: {},
    grid: {},
    yaxis: {},
    title: {}
  };
  resultSwabTable: any;

  years: number[] = [];

  constructor(private restApiServices: restApiService, private fb: UntypedFormBuilder, private spinner: NgxSpinnerService, private el: ElementRef) {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    const today = new Date();
    // TABLE GRIDJS
    this.resultSwabTable=new Grid({
      columns: [{
        name: "Area",
        sort: false,
      }, {
        name: "Micro",
        width: '110px'
      }, {
        name: "Week",
        width: '110px'
      }],
      style: { 
        table: { 
          'white-space': 'nowrap'
        }
      },
      data: [],
      sort: false,
      fixedHeader: true,
      search: true,
      language: {
        'search': {
          'placeholder': '   Search...'
        }
      },
      pagination: {
        limit: 10
      }
    }).render(this.el.nativeElement.querySelector('#resultSwab'));
    // END TABLE GRIDJS
    
    
    // Format the date as YYYY-MM-DD (required format for input type date)
    const formattedDate = today.toISOString().split('T')[0];
    
    // this.DateSelected = formattedDate;
    this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]');
    this._gradientDonutChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart2('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart3('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart4('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);

      // Chart Colors Set

    // GET RED AREA EACH LINE
    this.restApiServices.getRedAllLine().subscribe(data=>{
      this.allRed = data;
      this.countRed = this.allRed.length
      console.log('red-all-line', this.allRed);
      this.checkDataFinding()
      
    })
    this.restApiServices.getYellowAllLine().subscribe(data=>{
      this.allYellow = data;
      this.countYellow = this.allYellow.length
      console.log('yellow-all-line', this.allYellow);
      this.checkDataFinding()
      
    })
    this.restApiServices.postTarget({year:new Date().getFullYear()}).subscribe(data=>{
      this.target = data;
      console.log('target', this.target);
      this.checkDataFinding()
      
    })  
    // END GET RED AREA EACH LINE
  }

  private checkDataFinding() {
    if (this.allRed != null && this.allYellow != null && this.target != null) {
        this.chartMonitoringYtd(this.currentYear);
        this._donutCategory()
    }
  }

  private groupAndCount(array: any[], key: string) {
    const groupedObj = array.reduce((result, currentValue) => {
        const groupKey = currentValue[key];
        if (!result[groupKey]) {
            result[groupKey] = 0;
        }
        result[groupKey]++;
        return result;
    }, {});

    const groupedArray = Object.keys(groupedObj).map(category => ({
        category: category,
        value: groupedObj[category]
    }));

    return groupedArray;
}

  onYearSelected(event: any) {
    const selectedYear = event.target.value;
    console.log("tahun", selectedYear);

    this.restApiServices.postTarget({year:selectedYear}).subscribe(data=>{
      this.target = data;
      console.log('target', this.target);
      
    })  
    let red = this.allRed.filter((item: any) => item.year == selectedYear).length
    let yellow = this.allYellow.filter((item: any) => item.year == selectedYear).length
    
    this.chartMonitoringYtd(selectedYear)
    
  }

  private _donutCategory() {
    let red = this.allRed
    for(let eachData of this.allYellow){
      red.push(eachData);
    }
    console.log("donat",red);
    let categoryNotNull = red.filter((item: any) => item.category !== null)
    console.log("donat",categoryNotNull);
    const groupedData = this.groupAndCount(categoryNotNull, 'category');
    console.log("donat",groupedData);
    
    this.donutCategory = {
      series: groupedData.map((item:any) => {
        return item.value
      }),
      // series: [10,21,11],

      chart: {
        height: 310,
        type: "donut",
        toolbar: {
          show: true,
        },
      },

      legend: {
        position: "bottom",
      },

      labels: groupedData.map((item:any) => {
        return [item.category]
      }),
      // labels: ["A","B","C"],

      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      }
    };
  }

  private chartMonitoringYtd(year: any){
    let red : any = []
    let yellow : any = []
    // let test = this.allRed.filter((item:any) => (item.table === "tr_swab_al4_d" && item.year == 2023));
    // console.log('adir',test);
    // console.log('adir',test.length);
    

    for (let tableName of this.table) {
      const existingLineOnRed = this.allRed.filter((item:any) => (item.table === tableName && item.year == year));
      if (existingLineOnRed) {
        red.push(existingLineOnRed.length);
      } else {
        red.push(0);
      }

      const existingLineOnYellow = this.allYellow.filter((item:any) => (item.table === tableName && item.year == year));
      if (existingLineOnYellow) {
        yellow.push(existingLineOnYellow.length);
      } else {
        yellow.push(0);
      }
    }
    console.log('chart',red);
    console.log('chart',yellow);
    

    this.chartBarMonitoringYtd = {
      series: [
        {
          name: "Target",
          data: this.target.map((item:any)=>{
            return item.target
          }),
        },
        {
          name: "Red",
          data: red
        },
        {
          name: "Yellow",
          data: yellow
        },
      ],
      chart: {
        height: 230,
        type: "bar",
        toolbar: {
          show: true,
          tools: {
            download: true, // Aktifkan tombol download
          },
          autoSelected: 'download', // Pilih download secara otomatis
        },
      },
      plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: "60%",
          }
      },
      dataLabels: {
          enabled: false,
      },
      stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
      },
      colors: this.getChartColorsArray('["--vz-primary", "--vz-danger", "--vz-warning"]'),
      xaxis: {
          categories: [
              "M/C FSB",
              "OC1",
              "ENV FSB",
              "ENV PS",
              "OC2",
          ],
      },
      yaxis: {
          title: {
              text: "Value",
          },
      },
      grid: {
          borderColor: "#f1f1f1",
      },
      fill: {
          opacity: 1,
      },
      tooltip: {
          y: {
              formatter: function (val:any) {
                  return val;
              },
          },
      },
    };
  }

  async onChangeLine(e:any){
    this.selectedLineSwab = e.target.value
    console.log("area",this.selectedLineSwab);
    
    const result = ( await this.restApiServices.postArea({line:this.selectedLineSwab}).toPromise());
    console.log("area",result);
    this.areaSwab = result
    
  }
  
  onChangeMicro(e:any){
    this.selectedMicroSwab = e.target.value
  }

  onChangeDate(e: any) {
    // console.log(e.target._flatpickr.selectedDates);
    this.dateSelectedSwab.start = moment(e.target._flatpickr.selectedDates[0]).format('Y-MM-DD')
    this.dateSelectedSwab.end = moment(e.target._flatpickr.selectedDates[1]).format('Y-MM-DD')
  }

  onChangeArea(e:any){
    this.selectedAreaSwab = e.target.value
  }

  onSubmit(){
    let submit:any = []
    var detail_area:any = []
    var week:any = []
    var detail_area_null:any = []
    var week_null:any = []
    
    submit.push({ line: this.selectedLineSwab, micro: this.selectedMicroSwab, start: this.dateSelectedSwab.start, end: this.dateSelectedSwab.end, area: this.selectedAreaSwab});
    console.log(submit);
    this.restApiServices.postResultSwab(submit[0]).subscribe(data=>{
      this.resultSwab = data;
      let getKey : any;
      let microType : any;

      if(this.resultSwab.length == 0){
        console.log('result swab null');
        
      } else {
        console.log('full');
        getKey = Object.keys(this.resultSwab[0]);
        microType = getKey[1];
        console.log('area', getKey);
        console.log('area', microType);
      }


      this.resultSwab.forEach((data:any) => {
        if(data[microType] > 0){
          let isDetailExist = detail_area.find((item:any) => item.detail === data.detail_area);
  
          // CHECK REDUDANCY FROM WEEK
          if(isDetailExist){
            detail_area.find((item:any) => {
              if (item.detail === data.detail_area && item.week === data.week) {
                let lastIndexValue = item.value.length - 1;
                let lastValue = item.value[lastIndexValue];
                let newValue = data[microType];
  
                item.value[lastIndexValue] = lastValue + newValue;
                item.week = data.week;
                
              } else if (item.detail === data.detail_area) {
                item.value.push(data[microType]);
                item.week = data.week;
              }
              
            });
            
          }else{
            detail_area.push({detail:data.detail_area, value:[data[microType]], week:data.week})
  
          }
          // END CHECK REDUDANCY FROM WEEK
  
          // GROUP BY FOR WEEK
          if(week.includes(data.week)){
            
  
          } else {
            week.push(data.week)
            
          }
          // END GROUP BY FOR WEEK

        } else if(data[microType] == 0){
          let isDetailExist = detail_area.find((item:any) => item.detail === data.detail_area);
  
          // CHECK REDUDANCY FROM WEEK
          if(isDetailExist){
            detail_area_null.find((item:any) => {
              if (item.detail === data.detail_area && item.week === data.week) {
                let lastIndexValue = item.value.length - 1;
                let lastValue = item.value[lastIndexValue];
                let newValue = data[microType];
  
                item.value[lastIndexValue] = lastValue + newValue;
                item.week = data.week;
                
              } else if (item.detail === data.detail_area) {
                item.value.push(data[microType]);
                item.week = data.week;
              }
              
            });
            
          }else{
            detail_area_null.push({detail:data.detail_area, value:[data[microType]], week:data.week})
  
          }
          // END CHECK REDUDANCY FROM WEEK
  
          // GROUP BY FOR WEEK
          if(week_null.includes(data.week)){
            
  
          } else {
            week_null.push(data.week)
            
          }
          // END GROUP BY FOR WEEK
        }
          
      });


      // MAPPING TO LINE CHART
      this.resultSwabLineChart = {
        chart: {
          height: 388,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: true,
            tools: {
              download: true, // Aktifkan tombol download
            },
            autoSelected: 'download', // Pilih download secara otomatis
          },
          noData: {
            text: 'Data Kosong',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '16px',
              color: '#888'
            }
          }
        },
        // colors: colors,
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'straight'
        },
        series: detail_area.map((item:any)=>{
          return {
            name:item.detail, 
            data:item.value
          }
        }),
        // series: formattedSeriesData,
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.2
          },
          borderColor: '#f1f1f1'
        },
        markers: {
          size: 6
        },
        xaxis: {
          // categories: ['W23', 'W24', 'W25', 'W26', 'W27'],
          categories: week,
          title: {
            text: 'Week'
          }
        },
        yaxis: {
          title: {
            text: 'Quantity'
          },
        },
        // legend: {
        //   position: 'bottom',
        // }
        legend: {
          show: true,
        }
      };
      
      this.resultNullSwabLineChart = {
        chart: {
          height: 388,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: true,
            tools: {
              download: true, // Aktifkan tombol download
            },
            autoSelected: 'download', // Pilih download secara otomatis
          },
          noData: {
            text: 'Data Kosong',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '16px',
              color: '#888'
            }
          }
        },
        // colors: colors,
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 3,
          curve: 'straight'
        },
        series: detail_area_null.map((item:any)=>{
          return {
            name:item.detail, 
            data:item.value
          }
        }),
        // series: formattedSeriesData,
        grid: {
          row: {
            colors: ['transparent', 'transparent'],
            opacity: 0.2
          },
          borderColor: '#f1f1f1'
        },
        markers: {
          size: 6
        },
        xaxis: {
          // categories: ['W23', 'W24', 'W25', 'W26', 'W27'],
          categories: week_null,
          title: {
            text: 'Week'
          }
        },
        yaxis: {
          title: {
            text: 'Quantity'
          },
        },
        // legend: {
        //   position: 'bottom',
        // }
        legend: {
          show: true,
        }
      };
      // END MAPPING TO LINE CHART

      // UPDATE TABLE GRIDJS
      this.resultSwabTable.updateConfig({ 
        data: this.resultSwab.map((item:any)=>{          
          return [item.detail_area, item[microType], item.week]
        }) 
      }).forceRender();
      // END UPDATE TABLE GRIDJS
      
      console.log('series',this.resultSwabLineChart);
    })  
    
    
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
