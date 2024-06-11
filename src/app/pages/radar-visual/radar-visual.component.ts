import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validator } from '@angular/forms';
import { da } from 'date-fns/locale';
import { number } from 'echarts';

@Component({
  selector: 'app-radar-visual',
  templateUrl: './radar-visual.component.html',
  styleUrls: ['./radar-visual.component.scss']
})
export class RadarVisualComponent implements OnInit {
  DateSelected: any;
  materials: any;
  dateForm!: UntypedFormGroup;
  dateAnalysisForm!: UntypedFormGroup;
  totalMaterial: any;
  completeAnalysis: any;
  progressAnalysis: any;
  releaseMaterial: any;
  completion: any;
  types: any;
  suppliers: any;
  parameters: any;
  parameterData: any;
  type_id: any;
  dataAnalysis: any;
  id: any;
  selectedDate: any;

  jenis: any = "---Type---";
  manufacture: any = "";
  parameter: any = "";
  lineColumnAreaChart: any; 
  basicLineChart: any;
  dataChart: any;

  result: any; //  datachart
  totalResult: any; //chart
  dataResult: any; //dataAnalysisByDate
  startDate: any;
  nameParameter: any;
  dataMax : any;
  dataMin : any;
  min : any; 
  max : any;

  mean:any;
  ucl:any;
  lcl:any;


  chosenYearHandler(normalizedYear: Date) {
    this.selectedDate = normalizedYear;
  }

  constructor(private restApiService: restApiService, private fb: UntypedFormBuilder) {
  }

  ngOnInit(): void {
    const today = new Date();

    // Format the date as YYYY-MM-DD (required format for input type date)
    const formattedDate = today.toISOString().split('T')[0];

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
    this._lineColumnAreaChart('["--vz-primary", "--vz-info", "--vz-gray-300"]'); //report by counting
    this._basicLineChart('["--vz-primary"]'); // all report
  }

  get form() {
    return this.dateForm.controls;
  }

  dateSelected() {
    firstValueFrom(this.restApiService.getMaterial())
      .then((res: any) => {
        console.log(res)
        this.materials = res;
      })
      .catch((error: any) => {

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

        this.completion = ((this.releaseMaterial / this.totalMaterial) * 100).toFixed(2);;
        
      })
      .catch((error: any) => {

      })
  }

  getMaterialByDate() {
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

        this.completion = ((this.releaseMaterial / this.totalMaterial) * 100).toFixed(2);;
      })
      .catch((error: any) => {

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

  getManufacture() {
    this.manufacture = '';
    // this.type_id = e.target.value
    firstValueFrom(this.restApiService.getSupplier(this.jenis.id))
      .then((res: any) => {
        this.suppliers = res;
        if(this.suppliers.length == 0){
          firstValueFrom(this.restApiService.getParameter(this.jenis.group_id, this.jenis.id))
            .then((res: any) => {
              this.parameters = res;
            })
        }
      })
    // console.log(this.jenis)
  }

  getParameter() {
    // console.log(this.type_id);
    this.parameter = '';
    firstValueFrom(this.restApiService.getParameter(this.jenis.group_id, this.manufacture.jenis))
      .then((res: any) => {
        this.parameters = res;
      })
  }

  fetchDateSelected() {
    console.log("date selected by user is ---" + this.DateSelected);
  }

  // setParameterData(e:any){
  //   this.parameterData = e.target.value;
  //   console.log(this.parameterData.parameter);
  // }

  get f() {
    return this.dateAnalysisForm.controls;
  }

  getDataAnalysisByDate() {
    let startDate = this.f['startDate']?.value;
    let endDate = this.f['endDate']?.value;
    if(this.suppliers.length == 0){
      firstValueFrom(this.restApiService.getDataAnalysisByDate(this.jenis.group_id, this.jenis.id, this.parameter.parameter, startDate, endDate))
      .then((res: any) => {
        this.dataAnalysis = res.map((row:any)=> {
          return {
            ...row,
            result_d: row.result_d.replace(/[&lt;]/g, '')
          }
        });

    

        this.dataResult = this.dataAnalysis.map((row: any) => row.result_d)
        this.startDate = this.dataAnalysis.map((row: any) => row.tanggal)
        console.log(this.startDate)
        console.log(this.dataAnalysis)
        this.nameParameter = this.dataAnalysis.map((column: any) => column.item)
        this.mean = this.calculateMean(this.dataResult);
        this.ucl = this.calculateUCL(this.calculateMean(this.dataResult), this.calculateSigma(this.dataResult,
          this.calculateMean(this.dataResult)));
        this.lcl = this.calculateLCL(this.calculateMean(this.dataResult), this.calculateSigma(this.dataResult,
          this.calculateMean(this.dataResult)));

        console.log(this.ucl, this.lcl)
        // this.ucl = 0.5;
        // this.lcl= -0.1;
        this._basicLineChart('["--vz-primary"]');
      })
      .catch((error: any) => {


      })
    }else{
      firstValueFrom(this.restApiService.getDataAnalysisByDate(this.jenis.group_id, this.manufacture.jenis, this.parameter.parameter, startDate, endDate))
      .then((res: any) => {
        this.dataAnalysis = res.map((row:any)=> {
          return {
            ...row,
            
          }
        });
        //000,7

        console.log(this.dataAnalysis)

        this.dataResult = this.dataAnalysis.map((row: any) => row.result_d)
        this.startDate = this.dataAnalysis.map((row: any) => row.tanggal)
        this.nameParameter = this.dataAnalysis.map((column: any) => column.item)
        this.mean = this.calculateMean(this.dataResult);
        this.ucl = this.calculateUCL(this.calculateMean(this.dataResult), this.calculateSigma(this.dataResult,
          this.calculateMean(this.dataResult)));
        this.lcl = this.calculateLCL(this.calculateMean(this.dataResult), this.calculateSigma(this.dataResult,
          this.calculateMean(this.dataResult)));

        console.log(this.ucl, this.lcl)
        // this.ucl = 0.5;
        // this.lcl= -0.1;
        this._basicLineChart('["--vz-primary"]');
      })
      .catch((error: any) => {


      })
    }
    
  }

  getDataChart() {
    let startDate = this.f['startDate']?.value;
    let endDate = this.f['endDate']?.value;

    if(this.suppliers.length == 0){
      firstValueFrom(this.restApiService.getDataChart(this.jenis.group_id, this.jenis.id, this.parameter.parameter, startDate, endDate))
      .then((res: any) => {
        this.dataChart = res;
        this.result = this.dataChart.map((row: any) => row.result_d);
        this.totalResult = this.dataChart.map((row: any) => row.total);
        this.dataChart.map((row:any)=> {
          if(row.max === null && row.min === null){
            this.dataMax = 0;
            this.dataMin = 0;
          }else if(row.max === null){
            this.dataMax = 0;
          }else if(row.min === null){
            this.dataMin = 0;
          }else{
            this.dataMax = row.max
            this.dataMin = row.min
          }
        })

        console.log(this.dataMax, this.dataMin)

        this._lineColumnAreaChart('["--vz-primary", "--vz-info", "--vz-gray-300"]');

      })
    }else{
      firstValueFrom(this.restApiService.getDataChart(this.jenis.group_id, this.manufacture.jenis, this.parameter.parameter, startDate, endDate))
      .then((res: any) => {
        this.dataChart = res;
        this.result = this.dataChart.map((row: any) => row.result_d);
        this.totalResult = this.dataChart.map((row: any) => row.total);
        this.dataChart.map((row:any)=> {
          if(row.max === null && row.min === null){
            this.dataMax = 0;
            this.dataMin = 0;
          }else if(row.max === null){
            this.dataMax = 0;
          }else if(row.min === null){
            this.dataMin = 0;
          }else{
            this.dataMax = row.max
            this.dataMin = row.min
          }
        })

        console.log(this.dataMax, this.dataMin)

        this._lineColumnAreaChart('["--vz-primary", "--vz-info", "--vz-gray-300"]');

      })
    }
   
    // console.log(this.jenis)
  }

  getData() {
    this.getDataAnalysisByDate()
    this.getDataChart()
  }


  //GET CHART COLORS
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
* HISTOGRAM DATA CHART
*/
  private _lineColumnAreaChart(colors: any) {
    colors = ['#31256b'];
    this.lineColumnAreaChart = {
      series: [{
        name: this.nameParameter,
        type: 'column',
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
          text: 'Units',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " units";
            }
            return y;

          }
        }
      },
      colors: colors
    };
  }


  /**
  *  CONTROL DATA CHART
*/
  private _basicLineChart(colors: any) {
    colors = ['#31256b'];
    this.min = parseFloat(this.lcl) - 0.1
    this.max = parseFloat(this.ucl) + 0.1

    console.log('UCL',this.max)
    console.log('LCL',this.min)
    
    this.basicLineChart = {
      series: [
        {
        name: this.nameParameter,
        data: this.dataResult, //data sebelah kiri atau keatas
      },
    ],
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
      annotations: {
        yaxis: [
          {
            y: this.mean,
            borderColor: '#704264',
            label: {
              borderColor: '#704264',
              style: {
                color: '#fff',
                background: '#704264'
              },
              text: 'MEAN'
            }
          },
          {
            y: this.ucl,
            borderColor: '#00E396',
            label: {
              borderColor: '#00E396',
              style: {
                color: '#fff',
                background: '#00E396'
              },
              text: 'UCL'
            }
          },
          {
            y: this.lcl,
            borderColor: '#5755FE',
            label: {
              borderColor: '#5755FE',
              style: {
                color: '#fff',
                background: '#5755FE'
              },
              text: 'LCL'
            }
          }
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
      colors: colors,
      title: {
        style: {
          fontWeight: 500,
        },
      },
      xaxis: {
        categories: this.startDate, //ini yang nilai bawah atau kesamping
      },
      yaxis: {
        max : this.max,
        min : this.min
      }
      
      
    };
  }



/// PERHITUNGAN MEAN

calculateMean(data: []): GLfloat {
  let total = 0;
  let mean;
  data.map(row => total += parseFloat(row) ); // Menjumlahkan Semua Elemen
  mean = total/data.length // membagi total dengan panjang array data 
  return parseFloat(mean.toFixed(3)); // Nilai rata-rata yang sudah dibulatkan ini kemudian dikembalikan sebagai hasil fungsi.
}

calculateSigma(data: [], mean:any): GLfloat {
  const squaredDifferences = data.map(val => Math.pow(parseFloat(val) - mean, 2)); // menghitung perbedaan antara nilai elemen tersebut dan mean, lalu mengkuadratkan hasilnya.
  // || Hasil dari setiap perbedaan kuadrat ini disimpan
  let total = 0;
  squaredDifferences.map(row => total += row ); // menjumlahkan semua elemen dalam squaredDifferences, menyimpan hasilnya dalam variabel total.
  let sigma:any = Math.sqrt(total / data.length).toFixed(5); //rata-rata dari semua nilai dalam total.
  return sigma;
  // akar kuadrat dari rata-rata total, kemudian membulatkannya ke lima angka desimal.
  // Hasil akhir disimpan dalam variabel sigma.
}


calculateUCL(mean: any, sigma: any): GLfloat {
  let ucl:any = (mean + (3 * sigma)).toFixed(5) 
  return ucl;
}

calculateLCL(mean: any, sigma: any): GLfloat {
  let lcl:any = (mean - (3 * sigma)).toFixed(5) 
  return lcl;
}

calculateCP(upperLimit: any, lowerLimit: any, sigma: any): number {
  return (upperLimit - lowerLimit) / (6 * sigma);
}

calculateCPK(upperLimit: any, lowerLimit: any, mean: any, sigma: any): number {
  const cpkUpper = (upperLimit - mean) / (3 * sigma);
  const cpkLower = (mean - lowerLimit) / (3 * sigma);
  return Math.min(cpkUpper, cpkLower);
}


avgRange(data: any[]): GLfloat {

  let frekKom :any=[];
  let sum = 0;
  if(data.length == 1){
    frekKom.push(parseFloat(data[0]))
  }else{

    for (let index = 1; index < data.length; index++) {
      let x = Math.abs(parseFloat(data[index]) - parseFloat(data[index - 1]));
      frekKom.push(x);
    }
  }

// let sum = frekKom.reduce((acc: GLfloat, val: GLfloat) => acc + val, 0);
// let denominator = data.length - 1;
// let result = sum / denominator;
  console.log("frek", frekKom)

frekKom.map((row:any) => sum += parseFloat(row) );
let avg = sum/frekKom.length;

return parseFloat(avg.toFixed(5))
}


stdevWithin (data: any): GLfloat {
console.log("data", data)
let within = data/1.128;
return parseFloat (within.toFixed(5));
}



countCP(within: any): number {
  console.log("within", within)
  return parseFloat (((this.dataMax - this.dataMin) / (6 * within)).toFixed(2));
    console.log(this.countCP)
}

countCpkUsl(within: any, mean: any ): number {
    return parseFloat (((this.dataMax - mean) / (3 * within)).toFixed(2));
  }

  countCpkLsl(within: any, mean: any ): number {
    return parseFloat (((mean - this.dataMin) / (3 * within)).toFixed(2));
  }

  countAllCpk(cpkUsl:any, cpkLsl:any) {
    return Math.min(cpkUsl, cpkLsl);
    console.log(this.countAllCpk)
  }

}



