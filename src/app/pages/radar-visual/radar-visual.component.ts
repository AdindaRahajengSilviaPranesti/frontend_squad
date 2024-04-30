import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validator } from '@angular/forms';

@Component({
  selector: 'app-radar-visual',
  templateUrl: './radar-visual.component.html',
  styleUrls: ['./radar-visual.component.scss']
})
export class RadarVisualComponent implements OnInit {
  DateSelected : any; 
  materials:any;
  dateForm!: UntypedFormGroup;
  dateAnalysisForm!: UntypedFormGroup;
  totalMaterial: any;
  completeAnalysis: any;
  progressAnalysis: any;
  releaseMaterial: any;
  completion:any;
  types:any;
  suppliers:any;
  parameters:any;
  parameterData:any;
  type_id:any;
  dataAnalysis: any;
  id:any;
  selectedDate: any;

  jenis:any;
  manufacture:any;
  parameter:any;
  lineColumnAreaChart: any;
  basicLineChart: any;
  dataChart: any;

  result:any;
  totalResult:any;

  chosenYearHandler(normalizedYear: Date) {
    this.selectedDate = normalizedYear;
  }

  constructor(private restApiService: restApiService, private fb: UntypedFormBuilder){
    
  }

  ngOnInit(): void {
    const today = new Date();

    // Format the date as YYYY-MM-DD (required format for input type date)
    const formattedDate = today.toISOString().split('T')[0];

    // Set selectedDate to the formatted date
    // this.DateSelected = formattedDate;
    this.dateForm = this.fb.group({
      startDate: [formattedDate],
      endDate: [formattedDate]
    })
    this.dateAnalysisForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
    this.getMaterial()
    this.getType()
    this._lineColumnAreaChart('["--vz-primary", "--vz-info", "--vz-gray-300"]', [], []);
    this._basicLineChart('["--vz-primary"]');
  }

  get form(){
    return this.dateForm.controls;
  }

  dateSelected(){
    firstValueFrom(this.restApiService.getMaterial())
    .then((res: any) => {
      console.log(res)
      this.materials = res;
    })
    .catch((error: any)=>{

    })    
  }

  getMaterial() {
    firstValueFrom(this.restApiService.getMaterial())
      .then((res: any) => {
        this.materials = res;
        this.totalMaterial = this.materials.length;
  
        let ca = this.materials.filter((data: any) => data.status_analisis == 1);
        this.completeAnalysis = ca.length;
  
        this.progressAnalysis = this.totalMaterial - this.completeAnalysis;
  
        let releaseMaterial = this.materials.filter((data: any) => data.status == 1);
        this.releaseMaterial = releaseMaterial.length;
  
        this.completion = (this.releaseMaterial / this.totalMaterial) * 100;
      })
      .catch((error: any) => {
  
      })
  }
  

  getMaterialByDate(){
    let startDate = this.form['startDate']?.value;
    let endDate = this.form['endDate']?.value;
    firstValueFrom(this.restApiService.getMaterialByDate(startDate, endDate))

    .then((res: any) => {
      this.materials = res;
      this.totalMaterial = this.materials.length;

      let ca = this.materials.filter((data: any) => data.status_analisis == 1);
        this.completeAnalysis = ca.length;
  
        this.progressAnalysis = this.totalMaterial - this.completeAnalysis;
  
        let releaseMaterial = this.materials.filter((data: any) => data.status == 1);
        this.releaseMaterial = releaseMaterial.length;
  
        this.completion = (this.releaseMaterial / this.totalMaterial) * 100;
    })
    .catch((error: any)=>{

    })    
  }


  getType() {
    firstValueFrom(this.restApiService.getType())
      .then((res: any) => {
        this.types = res;
        
      })
      .catch((error: any) => {
  
      })
  }

  getManufacture(){
    // this.type_id = e.target.value
    firstValueFrom(this.restApiService.getSupplier(this.jenis.id))
    .then((res:any)=>{
      this.suppliers = res;
    })
    // console.log(this.jenis)
  }

  getParameter(){
    // console.log(this.type_id);
    firstValueFrom(this.restApiService.getParameter(this.jenis.group_id, this.manufacture.jenis))
    .then((res:any)=>{
      this.parameters = res;
    })
  }

  fetchDateSelected(){
    console.log("date selected by user is ---" + this.DateSelected);
  }

  // setParameterData(e:any){
  //   this.parameterData = e.target.value;
  //   console.log(this.parameterData.parameter);
  // }

  get f(){
    return this.dateAnalysisForm.controls;
  }

  getDataAnalysisByDate(){
    let startDate = this.f['startDate']?.value;
    let endDate = this.f['endDate']?.value;
    firstValueFrom(this.restApiService.getDataAnalysisByDate(this.jenis.group_id, this.manufacture.jenis, this.parameter.parameter, startDate, endDate))
    .then((res: any) => {
      this.dataAnalysis = res;
    })
    .catch((error: any)=>{

    })    
  }

  getDataChart(){
    let startDate = this.f['startDate']?.value;
    let endDate = this.f['endDate']?.value;
    firstValueFrom(this.restApiService.getDataChart(this.jenis.group_id, this.manufacture.jenis, this.parameter.parameter, startDate, endDate))
    .then((res:any)=>{
      this.dataChart = res;
      console.log(this.dataChart)
      this.result = this.dataChart.map((row:any)=> row.result);
      this.totalResult = this.dataChart.map((row:any)=> row.total);

      this._lineColumnAreaChart('["--vz-primary", "--vz-info", "--vz-gray-300"]', this.totalResult, this.result);
    })
    // console.log(this.jenis)
  }

  getData(){
    this.getDataAnalysisByDate()
    this.getDataChart()
  }


//GET CHART COLORS
  private getChartColorsArray(colors:any) {
    colors = JSON.parse(colors);
    return colors.map(function (value:any) {
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
 * Line, Column & Area Charts
 */
   private _lineColumnAreaChart(colors:any, totalResult: [], result: []) {
    colors = this.getChartColorsArray(colors);
    this.lineColumnAreaChart = {
      series: [{
        name: 'TEAM A',
        type: 'column',
        data: this.totalResult
    }, {
        name: 'TEAM B',
        type: 'area',
        data: this.totalResult
    }],
      chart: {
          height: 350,
          type: 'line',
          stacked: false,
          toolbar: {
              show: false,
          }
      },
      stroke: {
          width: [0, 2, 5],
          curve: 'smooth'
      },
      plotOptions: {
          bar: {
              columnWidth: '50%'
          }
      },
      fill: {
          opacity: [0.85, 0.25, 1],
          gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
          }
      },
      labels: this.result,
      markers: {
          size: 0
      },
      xaxis: {
          type: ''
      },
      yaxis: {
          title: {
              text: 'Points',
          },
          min: 0
      },
      tooltip: {
          shared: true,
          intersect: false,
          y: {
              formatter: function (y:any) {
                  if (typeof y !== "undefined") {
                      return y.toFixed(0) + " points";
                  }
                  return y;

              }
          }
      },
      colors: colors
    };
  } 


    /**
    * Basic Line Chart
  */
    private _basicLineChart(colors:any) {
      colors = this.getChartColorsArray(colors);
      this.basicLineChart  = {
        series: [{
          name: "STOCK ABC",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 10, 41, 35, 51, 49, 62, 69, 91, 148, 20, 60]
        }],
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          },
          toolbar: {
            show: false
          }
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
        colors: colors,
        title: {
          style: {
            fontWeight: 500,
          },
        },
        xaxis: {
          categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9','10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20' ],
        }
      };
    }
}
