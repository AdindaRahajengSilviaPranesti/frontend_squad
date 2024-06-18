import { Component, OnInit } from '@angular/core';

import { arrayData } from "../genba/data";
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { restApiService } from '../../core/services/rest-api.service';

@Component({
  selector: 'app-genba',
  templateUrl: './genba.component.html',
  styleUrls: ['./genba.component.scss'],
})
export class GenbaComponent implements OnInit {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  basicChart: any;
  columnWithDataChart: any;
  StackedColumnChart: any;
  StackedColumn100Chart: any;
  ColumnWithMarkerChart: any;
  ColumnWithRotatedChart: any;
  ColumnWithNagetiveChart: any;
  rangeColumnChart: any;
  dynamicLoadedChart: any;
  dynamicQuarterLoadedChart: any;
  distributedColumnChart: any;
  groupLabelChart: any;
  simpleDonutChart: any;
  simpleDonutChart2: any;
  
  allCrossGenba: any;
  countAllCrossGenba: any;
  allSelfGenba: any;
  countAllSelfGenba: any;
  allAreaFinding: any;
  crossOpen: any;
  crossClose: any;
  selfOpen: any;
  selfClose: any;
  areaFindingCross: any;
  areaFindingSelf: any;

  donutCategoryCross:any ;
  donutCategorySelf:any ;
  findingAreaBarChartCross:any ;
  findingAreaBarChartSelf:any ;

  page: number = 1;
  pageSelf: number = 1;
  pageSize: number = 10;
  startIndex: number = 1;
  endIndex: number = this.pageSize;
  totalPages: number = 0;
  isFiltered:any ;
  isFilteredSelf:any ;
  allCrossGenbaPaginated: any;
  allSelfGenbaPaginated: any;
  filteredData: any;
  filteredDataSelf: any;

  constructor(private restApiServices: restApiService) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Area Charts', active: true },
      { label: 'Pie Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._columnWithDataChart('["--vz-info"]');
    this._StackedColumnChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger"]');
    this._StackedColumn100Chart('["--vz-primary", "--vz-info", "--vz-gray-300"]');
    this._distributedColumnChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-dark", "--vz-info"]')
    this._simpleDonutChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');
    this._simpleDonutChart2('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]');

    // GET ALL FINDING
    this.restApiServices.getAllCrossGenba().subscribe(data=>{
      this.allCrossGenba = data;
      this.countAllCrossGenba = this.allCrossGenba.length;
      console.log('all cross',this.allCrossGenba);
      this.checkFindingData()
      
    })
    this.restApiServices.getAllSelfGenba().subscribe(data=>{
      this.allSelfGenba = data;
      this.countAllSelfGenba = this.allSelfGenba.length;
      console.log('all Self',this.allSelfGenba);
      this.checkFindingData()
      
    })
    this.restApiServices.getAllAreaFinding().subscribe(data=>{
      this.allAreaFinding = data;
      console.log('all area finding',this.allAreaFinding);
      this.checkFindingData()
      
    })
    // END GET ALL FINDING
  }

  private checkFindingData() {
    if (this.allCrossGenba != null && this.allSelfGenba != null && this.allAreaFinding != null) {
      this.crossOpen = this.allCrossGenba.filter((item:any) => item.jenis_inspection === 1 && item.status == "Open");
      this.crossClose = this.allCrossGenba.filter((item:any) => item.jenis_inspection === 1 && item.status == "Close");
      this.selfOpen = this.allSelfGenba.filter((item:any) => item.jenis_inspection === 0 && item.status == "Open");
      this.selfClose = this.allSelfGenba.filter((item:any) => item.jenis_inspection === 0 && item.status == "Close");
      this.areaFindingCross = this.allAreaFinding.filter((item:any) => item.jenis_inspection === 1);
      this.areaFindingSelf = this.allAreaFinding.filter((item:any) => item.jenis_inspection === 0);

      this.paginateData()
      this.paginateDataSelf()
      this.mapCategoryData()
    }
  }

  mapCategoryData() {
    // GROUP CROSS GENBA
    const groupedCross = this.allCrossGenba.reduce((result:any, currentValue:any) => {
      const category = currentValue.category;
      if (!result[category]) {
        result[category] = 0;
      }
      result[category]++;
      return result;
    }, {});

    const countsCrossGenbaCategory = Object.values(groupedCross);
    const categoriesCrossGenba = Object.keys(groupedCross);

    let dataChartCrossGenba = [
      { count: countsCrossGenbaCategory },
      { category: categoriesCrossGenba }
    ];

    console.log('dataChartDonatCrossGenba',dataChartCrossGenba);
    // END GROUP CROSS GENBA

    // GROUP SELF GENBA
    const groupedSelf = this.allSelfGenba.reduce((result:any, currentValue:any) => {
      const category = currentValue.category;
      if (!result[category]) {
        result[category] = 0;
      }
      result[category]++;
      return result;
    }, {});

    const countsSelfGenbaCategory = Object.values(groupedSelf);
    const categoriesSelfGenba = Object.keys(groupedSelf);

    let dataChartSelfGenba = [
      { count: countsSelfGenbaCategory },
      { category: categoriesSelfGenba }
    ];

    console.log('dataChartDonatSelfGenba',dataChartSelfGenba);
    // END GROUP SELF GENBA

    // GROUP AREA
    console.log('dataChartCrossArea',this.allCrossGenba);
    const areasCross = Array.from(new Set(this.areaFindingCross.map((item:any) => item.area)));

    const openCountsAreaCross = new Array(areasCross.length).fill(0);
    const closeCountsAreaCross = new Array(areasCross.length).fill(0);

    this.areaFindingCross.forEach((item:any) => {
      const index = areasCross.indexOf(item.area);
      if (item.status === "Open") {
        openCountsAreaCross[index] = item.total;
      } else if (item.status === "Close") {
        closeCountsAreaCross[index] = item.total;
      }
    });
    
    let dataChartCrossArea = [
      { open: openCountsAreaCross },
      { close: closeCountsAreaCross },
      { area: areasCross }
      ];
    
    const areasSelf = Array.from(new Set(this.areaFindingSelf.map((item:any) => item.area)));

    const openCountsAreaSelf = new Array(areasSelf.length).fill(0);
    const closeCountsAreaSelf = new Array(areasSelf.length).fill(0);

    this.areaFindingSelf.forEach((item:any) => {
      const index = areasSelf.indexOf(item.area);
      if (item.status === "Open") {
        openCountsAreaSelf[index] = item.total;
      } else if (item.status === "Close") {
        closeCountsAreaSelf[index] = item.total;
      }
    });

    let dataChartSelfArea = [
      { open: openCountsAreaSelf },
      { close: closeCountsAreaSelf },
      { area: areasSelf }
    ];

    console.log('Self Area',dataChartSelfArea);
    // END GROUP AREA

    // CHART
    this._donutCategoryCross(dataChartCrossGenba)
    this._donutCategorySelf(dataChartSelfGenba)
    this._findingAreaBarChartCross(dataChartCrossArea)
    this._findingAreaBarChartSelf(dataChartSelfArea)
    // END CHART
  }

  private _donutCategoryCross(dataChart:any){
    const counts = dataChart[0].count;
    const categories = dataChart[1].category;

    this.donutCategoryCross = {
      series: counts,
      // series: [10,21,11],

      labels: categories,
      // labels: ["A","B","C"],

      chart: {
        height: 460,
        type: "donut",
        toolbar: {
          show: true,
        },
      },

      legend: {
        position: "bottom",
      },

      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      }
    };
  }
  
  private _donutCategorySelf(dataChart:any){
    const counts = dataChart[0].count;
    const categories = dataChart[1].category;

    this.donutCategorySelf = {
      series: counts,
      // series: [10,21,11],

      labels: categories,
      // labels: ["A","B","C"],

      chart: {
        height: 460,
        type: "donut",
        toolbar: {
          show: true,
        },
      },

      legend: {
        position: "bottom",
      },

      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      }
    };
  }

  private _findingAreaBarChartCross(dataChart:any){
    const open = dataChart[0].open;
    const close = dataChart[1].close;
    const area = dataChart[2].area;

    this.findingAreaBarChartCross = {
      chart: {
        type: 'bar',
        stacked: true,
        height: 600 
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      series: [
        {
          name: "Open",
          data: open
          // data: [44, 55, 41, 64, 22, 43, 21]
        },
        {
          name: "Close",
          data: close
          // data: [53, 32, 33, 52, 13, 44, 32]
        },
      ],
      xaxis: {
        categories: area
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
      },
      yaxis: {
        title: {
          text: "Area"
        }
      },
    }
  }
  
  private _findingAreaBarChartSelf(dataChart:any){
    const open = dataChart[0].open;
    const close = dataChart[1].close;
    const area = dataChart[2].area;

    this.findingAreaBarChartSelf = {
      chart: {
        type: 'bar',
        stacked: true,
        height: 600
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      series: [
        {
          name: "Open",
          data: open
          // data: [44, 55, 41, 64, 22, 43, 21]
        },
        {
          name: "Close",
          data: close
          // data: [53, 32, 33, 52, 13, 44, 32]
        },
      ],
      xaxis: {
        categories: area
        // categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"]
      },
      yaxis: {
        title: {
          text: "Area"
        }
      },
    }
  }

  // DETAIL TABLE CROSS
  paginateData() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    if (this.isFiltered) {
      console.log('filtered',this.filteredData);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.allCrossGenbaPaginated = this.filteredData.slice(start, end);

    } else{
      console.log('not filtered');
      this.allCrossGenbaPaginated = this.allCrossGenba.slice(start, end);
      this.countAllCrossGenba = this.allCrossGenba.length

    }
    console.log('dataPaginated', this.allCrossGenbaPaginated);
  }

  searchData(event:any) {
    const val = event.target.value.toLowerCase();
    this.isFiltered = val;
    
    const result = this.allCrossGenba.filter(function (d:any) {
      const category = d.category ? d.category.toLowerCase() : '';
      const tgl = d.tgl ? d.tgl.toLowerCase() : '';
      const status = d.status ? d.status.toLowerCase() : '';
    
      return (
        category.toLowerCase().indexOf(val) !== -1 ||
        tgl.toLowerCase().indexOf(val) !== -1 ||
        status.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    
    console.log(result.length);
    this.countAllCrossGenba = result.length
    this.filteredData = result;
    this.paginateData()

  }

  getShowingText(): string {
    const startIndex = (this.page - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.page * this.pageSize, this.countAllCrossGenba);
    return `Showing ${startIndex} - ${endIndex}`;
  }
  // END DETAIL TABLE CROSS

  // DETAIL TABLE SELF
  paginateDataSelf() {
    const start = (this.pageSelf - 1) * this.pageSize;
    const end = start + this.pageSize;
    if (this.isFilteredSelf) {
      console.log('filtered',this.filteredDataSelf);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.allSelfGenbaPaginated = this.filteredDataSelf.slice(start, end);

    } else{
      console.log('not filtered');
      this.allSelfGenbaPaginated = this.allSelfGenba.slice(start, end);
      this.countAllSelfGenba = this.allSelfGenba.length

    }
    console.log('dataPaginated', this.allSelfGenbaPaginated);
  }

  searchDataSelf(event:any) {
    const val = event.target.value.toLowerCase();
    this.isFilteredSelf = val;

    const result = this.allSelfGenba.filter(function (d:any) {
      const category = d.category ? d.category.toLowerCase() : '';
      const tgl = d.tgl ? d.tgl.toLowerCase() : '';
      const status = d.status ? d.status.toLowerCase() : '';
    
      return (
        category.toLowerCase().indexOf(val) !== -1 ||
        tgl.toLowerCase().indexOf(val) !== -1 ||
        status.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    
    console.log(result.length);
    this.countAllSelfGenba = result.length
    this.filteredDataSelf = result;
    this.paginateData()

  }

  getShowingTextSelf(): string {
    const startIndex = (this.pageSelf - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.pageSelf * this.pageSize, this.countAllSelfGenba);
    return `Showing ${startIndex} - ${endIndex}`;
  }
  // END DETAIL TABLE SELF

  onPageChange(page: any, type: any) {
    if (type == "cross") {
      this.page = page;
      this.paginateData();
    } else if(type == "self"){
      this.pageSelf = page;
      this.paginateDataSelf();
    }
  }  

  // Chart Colors Set
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

  
  /**
  * Column with Data Labels
  */
  private _columnWithDataChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.columnWithDataChart = {
      series: [{
        name: "Inflation",
        data: [2.5, 3.2, 5.0, 10.1, 4.2, 3.8, 3, 2.4, 4.0, 1.2, 3.5, 0.8],
      },],
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#adb5bd"],
        },
      },
      colors: colors,
      grid: {
        borderColor: "#f1f1f1",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        position: "top",
        labels: {
          offsetY: -18,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        gradient: {
          shade: "light",
          type: "horizontal",
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val: any) {
            return val + "%";
          },
        },
      },
      title: {
        text: "Monthly Inflation in Argentina, 2002",
        floating: true,
        offsetY: 320,
        align: "center",
        style: {
          color: "#444",
          fontWeight: 500,
        },
      },
    };
  }

  /**
  * Stacked Column Charts
  */
  private _StackedColumnChart(colors: any) {
    colors = ['#007bff', '#ff8c00']; 
    this.StackedColumnChart = {
      series: [{
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43],
      },
      {
        name: "PRODUCT B",
        data: [21, 7, 25, 13, 22, 8],
      },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: true,
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },],
      plotOptions: {
        bar: {
          horizontal: false,
          borderRadius: 10,
        },
      },
      xaxis: {
        type: "datetime",
        categories: [
          "01/01/2011 GMT",
          "01/02/2011 GMT",
          "01/03/2011 GMT",
          "01/04/2011 GMT",
          "01/05/2011 GMT",
          "01/06/2011 GMT",
        ],
      },
      legend: {
        position: "right",
        offsetY: 40,
      },
      fill: {
        opacity: 1,
      },
      colors: colors,
    };
  }

  /**
 * Stacked Column 100
 */
  private _StackedColumn100Chart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.StackedColumn100Chart = {
      series: [{
        name: "PRODUCT A",
        data: [44, 55, 41, 67, 22, 43, 21, 49],
      },
      {
        name: "PRODUCT B",
        data: [13, 23, 20, 8, 13, 27, 33, 12],
      },
      {
        name: "PRODUCT C",
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: false,
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },],
      xaxis: {
        categories: [
          "2011 Q1",
          "2011 Q2",
          "2011 Q3",
          "2011 Q4",
          "2012 Q1",
          "2012 Q2",
          "2012 Q3",
          "2012 Q4",
        ],
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "right",
        offsetX: 0,
        offsetY: 50,
      },
      colors: colors,
    };
  }

  /**
 * Simple Donut Chart
 */
  private _simpleDonutChart(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.simpleDonutChart = {
      series: [44, 55, 41, 17, 15],
      chart: {
        height: 300,
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors,
    };
  }
  /**
 * Simple Donut Chart2
 */
  private _simpleDonutChart2(colors:any) {
    colors = this.getChartColorsArray(colors);
    this.simpleDonutChart2 = {
      series: [10, 55, 41, 99, 15],
      chart: {
        height: 300,
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors,
    };
  }

  
 
  /**
  * Distributed Columns Charts
   */
  private _distributedColumnChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.distributedColumnChart = {
      series: [{
        data: [21, 22, 10, 28, 16, 21, 13, 30]
      }],
      chart: {
        height: 350,
        type: 'bar',
        events: {
          click: function (chart: any, w: any, e: any) {
          }
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px'
          }
        }
      }
    };
  }
}
