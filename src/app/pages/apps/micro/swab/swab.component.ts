import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import * as moment from 'moment';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grid } from 'gridjs';
import { groupBy } from 'lodash';

@Component({
  selector: 'app-swab',
  templateUrl: './swab.component.html',
  styleUrls: ['./swab.component.scss']
})
export class SwabComponent {
  currentYear = new Date().getFullYear();
  years: number[] = [];
  allRed: any;
  allYellow: any;
  countRed: any;
  countYellow: any;
  target: any;

  chartBarMonitoringYtd: any;
  donutCategory: any;

  selectedLine:any;
  imageUrl = 'assets/images/';
  imageName = "bg-micro-resize.png";
  // image = 'https://myapps.aio.co.id/lds_micro/attachment/';
  selectedImageTable:any;
  selectedImageSampling:any;
  imageSamplings:any;
  imageAreas:any=[];
  areas:any;
  kondisi:any;
  corrective:any;
  preventive:any;

  selectedLineSwab: any;
  micro: any;
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


  constructor(public restApiServices: restApiService, private formBuilder: UntypedFormBuilder, private el: ElementRef) {
    for (let year = this.currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
    
  }

  

  ngOnInit(): void {
    // GET RED AREA EACH LINE
    this.restApiServices.getRedAllLineSkb().subscribe(data=>{
      this.allRed = data;
      this.countRed = this.allRed.filter((item: any) => item.tahun == this.currentYear).length
      console.log('red-all-line', this.allRed);
      console.log('red-all-line', this.countRed);
      this.checkDataFinding()

      let dataTableAllRed = this.allRed.map((item:any)=>{
        const bacteria = item.bacteria === -1 ? 'none' : item.bacteria;
        const yeast = item.yeast === -1 ? 'none' : item.yeast;
        const mold = item.mold === -1 ? 'none' : item.mold;
        const jamur = item.jamur === -1 ? 'none' : item.jamur;

        const eColiValue = item.e_coli === -1 ? 'none' : item.e_coli;
        const salValue = item.salmonella === -1 ? 'none' : item.salmonella;
        const tmValue = item.tm === -1 ? 'none' : item.tm;
        const tabValue = item.tab === -1 ? 'none' : item.tab;
        const coliformValue = item.coliform === -1 ? 'none' : item.tab;
        return [item.id_temuan, item.week, item.tanggal, item.jenis_swab.toUpperCase(), item.line, item.category, item.swab_detail, bacteria, yeast, mold, jamur, eColiValue, salValue, tmValue, tabValue, coliformValue, item.pic_swab, item.pic_input, item.kondisi, item.rootcase, item.corrective, item.preventive]
      });

      new Grid({
        // columns: ['Name', 'Age', 'Country', 'Age', 'Country', 'Age', 'Country', 'Age', 'Country'],
        columns: [{
          name: "ID Temuan",
          width: '12%',
          sort: true,
        }, {
          name: "Week",
          width: '10%'
        }, {
          name: "Tanggal",
          width: '20%'
        }, {
          name: "Jenis Swab",
          width: '12%'
        }, {
          name: "Line",
          width: '10%'
        }, {
          name: "Category",
          width: '20%'
        },{
          name: "Swab Detail",
          width: '20%'
        }, {
          name: "Bacteria",
          width: '10%'
        }, {
          name: "Yeast",
          width: '10%'
        }, {
          name: "Mold",
          width: '10%'
        }, {
          name: "Jamur",
          width: '10%'
        }, {
          name: "Ecoli",
          width: '10%'
        }, {
          name: "Salmonella",
          width: '10%'
        }, {
          name: "TM",
          width: '10%'
        }, {
          name: "TAB",
          width: '10%'
        }, {
          name: "Coliform",
          width: '10%'
        }, {
          name: "PIC Swab",
          width: '30%'
        }, {
          name: "PIC Input",
          width: '30%'
        }, {
          name: "Evidence",
          width: '40%'
        }, {
          name: "Rootcase",
          width: '40%'
        }, {
          name: "Corrective",
          width: '40%'
        }, {
          name: "Preventive",
          width: '40%'
        }],
        data: dataTableAllRed,
        sort: true,
        fixedHeader: true,
        search: true,
        language: {
          'search': {
            'placeholder': '   Search...'
          }
        },
        pagination: {
          limit: 10
        },
      }).render(this.el.nativeElement.querySelector('#rsmRedArea'));
      
    })

    this.restApiServices.getYellowAllLineSkb().subscribe(data=>{
      this.allYellow = data;
      this.countYellow = this.allYellow.filter((item: any) => item.tahun == this.currentYear).length
      console.log('yellow-all-line', this.allYellow);
      this.checkDataFinding()
      
    })

    this.restApiServices.postTargetSkb({year:new Date().getFullYear()}).subscribe(data=>{
      this.target = data;
      console.log('target', this.target);
      this.checkDataFinding()
      
    })  
    // END GET RED AREA EACH LINE
    
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
  }

  private checkDataFinding() {
    if (this.allRed != null && this.allYellow != null && this.target != null) {
      this.chartMonitoringYtd(this.currentYear);
      this._donutCategory(this.currentYear) 
    }
  }

  onYearSelected(event: any) {
    const selectedYear = event.target.value;
    console.log("tahun", selectedYear);

    this.restApiServices.postTargetSkb({year:selectedYear}).subscribe(data=>{
      this.target = data;
      console.log('target', this.target);
      
    })  
    this.countRed = this.allRed.filter((item: any) => item.tahun == selectedYear).length
    this.countYellow = this.allYellow.filter((item: any) => item.tahun == selectedYear).length

    this.chartMonitoringYtd(selectedYear)
    this._donutCategory(selectedYear)
    
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

  private chartMonitoringYtd(year: any){
    let red : any = []
    let yellow : any = []
    // let test = this.allRed.filter((item:any) => (item.table === "tr_swab_al4_d" && item.year == 2023));
    // console.log('adir',test);
    // console.log('adir',test.length);
    

    for (let i = 1; i <= 9; i++) {
      const existingLineOnRed = this.allRed.filter((item:any) => (item.id_area === i && item.tahun == year));
      if (existingLineOnRed) {
        red.push(existingLineOnRed.length);
      } else {
        red.push(0);
      }

      const existingLineOnYellow = this.allYellow.filter((item:any) => (item.id_area === i && item.tahun == year));
      if (existingLineOnYellow) {
        yellow.push(existingLineOnYellow.length);
      } else {
        yellow.push(0);
      }
    }
    console.log('chart red',red);
    console.log('chart yellow',yellow);
    console.log('chart target',this.target);
    

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
              "CAN",
              "PET",
              "OC3",
              "AL4",
              "ENMIX",
              "SACHET",
              "GBL",
              "SIPA",
              "SGH",
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

  private _donutCategory(year:any) {
    let red = this.allRed
    for(let eachData of this.allYellow){
      red.push(eachData);
    }
    console.log("donat",red);
    console.log("donat tahun",year);
    let categoryNotNull = red.filter((item: any) => item.category !== null && item.tahun == year)
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

  onImageLine(e:any){
    this.selectedLine = {line:e.target.value}
    this.restApiServices.imageSampling(this.selectedLine).subscribe(data=>{
      let result = data
      this.selectedImageTable = result.table;
      this.imageSamplings = result.data;
      
      
    })
  }

  onImageSampling(e:any){
    this.selectedImageSampling = e.target.value;
    let submitSampling = {table:this.selectedImageTable, tanggal:e.target.value}
    // console.log(submitSampling);
    
    this.restApiServices.imageArea(submitSampling).subscribe(data=>{
      let result = data
      this.areas = result
      this.imageAreas = []

      console.log(result);
      
      result.map((item:any)=>{
        this.imageAreas.push({value:item.id, name:item.detail_area})
      })
      // console.log('area=',this.imageAreas);
      
    })
  }

  onImageArea(e:any){
    // console.log('area2=',e.target.value);
    // console.log('area3=',this.areas);

    for (const area of this.areas) {
      if (area.id == e.target.value) {
        // console.log('area4=',area.id);
        // this.imageUrl = "http://localhost/lds-microbiology/attachment/"
        this.imageUrl = "https://myapps.aio.co.id/lds_micro/attachment/"
        this.imageName = area.image
        this.kondisi = area.request
        this.corrective = area.corrective
        this.preventive = area.preventive
      }
    }
    
  }

  async onChangeLine(e:any){
    this.selectedLineSwab = e.target.value
    console.log("area",this.selectedLineSwab);
    
    this.restApiServices.postMicroSkb({line:this.selectedLineSwab}).subscribe(data=>{
      this.micro= data
    })
    
    this.restApiServices.postAreaSkb({line:this.selectedLineSwab}).subscribe(data=>{
      this.areaSwab = data
    })
    
  }

  onChangeMicro(e:any){
    this.selectedMicroSwab = e.target.value
  }
  
  onChangeDate(e: any) {
    // console.log(e.target._flatpickr.selectedDates);
    this.dateSelectedSwab.start = moment(e.target._flatpickr.selectedDates[0]).format('Y-MM-DD')
    this.dateSelectedSwab.end = moment(e.target._flatpickr.selectedDates[1]).format('Y-MM-DD')
    
  }

  onChangeArea(e: any){
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
    this.restApiServices.postResultSwabSkb(submit[0]).subscribe(data=>{
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
      
    })
  }

  
}
