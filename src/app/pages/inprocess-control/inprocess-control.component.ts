import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-inprocess-control',
  templateUrl: './inprocess-control.component.html',
  styleUrls: ['./inprocess-control.component.scss']
})
export class InprocessControlComponent implements OnInit {

  title = 'spinner';
  customDataLabelsChart: any;
  basicChart: any;
  fsb: any;
  dataMax: any;
  dataMin: any;
  dateForm!: UntypedFormGroup;
  dateAnalysisForm!: UntypedFormGroup;

  mean: any;
  ucl: any;
  lcl: any;
  kesimpulans: any;

  parameter: any = "---Parameter---";
  type: any;

  cp:any = [];
  cpk:any = [];

  selectedParameter:any;

  constructor(private restApiService: restApiService, private fb: UntypedFormBuilder, private spinner: NgxSpinnerService) {
    
    
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
    this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]');
    this._customDataLabelsChart('["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info", "--vz-warning", "--vz-danger"]', [], [], []);
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
 * Basic Column Charts
 */
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

//CHART CAPABILITY
private _customDataLabelsChart(colors: any, maxCpCpk: any= [], averages: any = [], minCpCpk: any =[]) {
  colors = this.getChartColorsArray(colors);

  const chartData = [
    ...maxCpCpk, 
    ...averages, 
    ...minCpCpk,
  ];

  const chartCategories = [
    "CPKmax",
    "CPmax",
    "CPKavg",
    "CPavg",
    "CPKmin",
    "CPmin",
  ];

  this.customDataLabelsChart = {
    series: [
      {
        data: chartData,
      },
    ],
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        barHeight: "100%",
        distributed: true,
        horizontal: true,
        dataLabels: {
          position: "bottom",
        },
      },
    },
    colors: ["#618264", "#79AC78", "#776B5D", "#DBA979", "#A87676", "#F6995C"],
    dataLabels: {
      enabled: true,
      textAnchor: "start",
      style: {
        colors: ["#fff"],
      },
      formatter: function (val: any, opt: any) {
        return `${opt.w.globals.labels[opt.dataPointIndex]}: ${val}`;
      },
      offsetX: 0,
      dropShadow: {
        enabled: false,
      },
    
    },
    stroke: {
      width: 1,
      colors: ["#fff"],
    },
    xaxis: {
      categories: chartCategories,
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    title: {
      align: "center",
      floating: true,
      style: {
        fontWeight: 600,
      },
    },
    subtitle: {
      align: "center",
    },
    tooltip: {
      theme: "dark",
      x: {
        show: false,
      },
      y: {
        title: {
          formatter: function () {
            return "";
          },
        },
      },
    },
  };
}



  get form() {
    return this.dateForm.controls;
  }

  setParameter(e:any){
    if(e.target.value == 'Berat - Baking'){
      this.selectedParameter = 'Weight Baking'
    }else if(e.target.value == 'Moisture content'){
      this.selectedParameter = 'Moisture Baking'

    }else{
      this.selectedParameter = 'Weight Finish Good'

    }
  }

  getFsb() {
    this.spinner.show()
    let startDate = this.form['startDate']?.value;
    let endDate = this.form['endDate']?.value;
    firstValueFrom(this.restApiService.getFsb(startDate, endDate, this.parameter))
      .then((res: any) => {
        this.type = res;
        let keterangan: any = [];

        //map keterangan
        res.map((row: any) => {
          if (!keterangan.includes(row.keterangan)) {
            keterangan.push(row.keterangan)
          }
        })
        //WEIGHT BAKING
        let mean = this.calculateMean(this.type, keterangan);
        this.calculateSigma(this.type, mean);
        let avgRange = this.avgRange(this.type, keterangan);
        let stdWithin = this.stdevWithin(avgRange)
        let cp = this.countCP(stdWithin);
        let cpkUsl = this.countCpkUsl(stdWithin, mean)
        let cpkLsl = this.countCpkLsl(stdWithin, mean)
        let cpk = this.countAllCpk(cpkUsl, cpkLsl);
        let merge = this.mergeCpkCp(cp, cpk);
        let cpresult:any = []
        let cpkresult:any = []

        merge.map((row:any) =>{
          cpresult.push(row.cp)
          cpkresult.push(row.cpk)
        });

        this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]', keterangan, cpresult, cpkresult);
        
        this.spinner.hide()
        
        // max min
        const maxCpk = cpkresult.reduce((top:any, current:any) => (current > top ? current : top), 0);
        const maxCp = cpresult.reduce((top:any, current:any) => (current > top ? current : top), 0);
        const minCpk = cpkresult.reduce((top:any, current:any) => (current < top ? current : top), 0);
        const minCp = cpresult.reduce((top:any, current:any) => (current < top ? current : top), 0);

        //avg
        let totalCpk  = 0;
        let totalCp  = 0;

        cpkresult.map((item:any) => totalCpk += parseFloat(item))
        cpresult.map((item:any) => totalCp += parseFloat(item))

        

        const averageCp = (totalCp / cpresult.length).toFixed(2);  // rata-rata CP
        const averageCpk = (totalCpk / cpkresult.length).toFixed(2);  // rata-rata CPK

        // Menghitung rata-rata maksimum dan minimum
        const maxCpCpk = [maxCpk, maxCp]
        const minCpCpk = [minCpk, minCp]
        const averages = [averageCpk, averageCp];  // kumpulkan rata-rata

        this._customDataLabelsChart('["--vz-primary", "--vz-secondary", "--vz-success", "--vz-info", "--vz-warning", "--vz-danger"]', maxCpCpk, averages, minCpCpk);

        // Menampilkan hasil
        console.log("Max CPK:", maxCpk);
        console.log("Min CPK:", minCpk);
        console.log("Max CP:", maxCp);
        console.log("Min CP:", minCp);
        console.log("CP Average:", averageCp);
        console.log("CPK Average:", averageCpk);


      })
      .catch((error: any) => {
        this.spinner.hide()
      })
  }



  mergeCpkCp(cp: [], cpk: []){
    let cpCpk :any = [];
    cp.map((cp:any) => {
      cpk.map((cpk:any) => {
        if(cp.keterangan == cpk.keterangan){
          cpCpk.push({
            ...cp,
            cpk: cpk.allCpk
          })
        }
      })
    })

    console.log(cpCpk)

    return cpCpk;
  }


//WEIGHT BAKING
calculateMean(data: [], keterangan: []) {
  let mean: any = [];

  keterangan.map((row: any) => {
    let total = 0;
    let betot = 0;
    data.map((val: any) => {
      if (row == val.keterangan) {
        total += 1;
        betot += val.berat
      }
    })
    mean.push({
      keterangan: row,
      betot: betot,
      total: total,
      mean: (betot / total).toFixed(2)
    })
    // totall.push(total)
    // betott.push(betot)
  })
  // console.log("mean",mean)
  return mean;
}

calculateSigma(data: [], mean: []) {
  let sigma: any = [];
  mean.map((mean: any) => {
    let sd = 0;
    data.map((data: any) => {
      if (mean.keterangan == data.keterangan) {
        sd += Math.pow((data.berat - mean.mean), 2)
      }
    })
    sigma.push({
      keterangan: mean.keterangan,
      betot: mean.betot,
      total: mean.total,
      mean: mean.mean,
      sigma: Math.sqrt(sd / mean.total).toFixed(2)
    })
  })

  console.log("sigma", sigma)
}

calculate(upperLimit: any, lowerLimit: any, sigma: any): number {
  return (upperLimit - lowerLimit) / (6 * sigma);
}

calculateCPK(upperLimit: any, lowerLimit: any, mean: any, sigma: any): number {
  const cpkUpper = (upperLimit - mean) / (3 * sigma);
  const cpkLower = (mean - lowerLimit) / (3 * sigma);
  return Math.min(cpkUpper, cpkLower);
}

avgRange(data: any[], keterangan: []) {
  let avgRange: any = [];
  keterangan.map((row: any) => {
    let total = 0;
    let frekKom = 0;
    let min;
    let max;
    data.map((val: any, index: any) => {
      if (row == val.keterangan) {
        min = val.min;
        max = val.max;
        total += 1;
        if (index != 0) {
          frekKom += Math.abs(data[index].berat - data[index - 1].berat)
        }
      }
    })
    avgRange.push({
      keterangan: row,
      total: total,
      max: max,
      min: min,
      avgRange: (frekKom / (total - 1)).toFixed(2)
    })
    // totall.push(total)
    // betott.push(betot)
  })

  return avgRange

}

stdevWithin(avgRange: []) {
  let stdWithin: any = []

  avgRange.map((row: any) => {
    stdWithin.push({
      ...row,
      stdWithin: (row.avgRange / 1.128).toFixed(2)
    })
  })

  console.log(stdWithin)
  return stdWithin
}

countCP(within: []) {
  let cp: any = [];
  within.map((row: any) => {
    cp.push({
      ...row,
      cp: ((row.max - row.min) / (6 * row.stdWithin)).toFixed(2)
    })
  })

  console.log("cp", cp)
  return cp;
  // return parseFloat(((this.dataMax - this.dataMin) / (6 * within)).toFixed(2));
}

countCpkUsl(stdWithin: [], mean: []) {
  let cpkUsl: any = [];

  mean.map((row: any) => {
    stdWithin.map((std: any) => {
      if (row.keterangan == std.keterangan) {
        cpkUsl.push({
          ...std,
          mean: row.mean,
          cpkUsl: ((std.max - row.mean) / (3 * std.stdWithin)).toFixed(2)
        })
      }
    })
  })

  console.log("cpkUsl", cpkUsl)

  return cpkUsl;
}

countCpkLsl(stdWithin: [], mean: []) {
  let cpkLsl: any = [];

  mean.map((row: any) => {
    stdWithin.map((std: any) => {
      if (row.keterangan == std.keterangan) {
        cpkLsl.push({
          ...std,
          mean: row.mean,
          cpkLsl: ((row.mean - std.min) / (3 * std.stdWithin)).toFixed(2)
        })
      }
    })
  })

  console.log("cpkLsl", cpkLsl)

  return cpkLsl;
}

countAllCpk(cpkUsl: [], cpkLsl: []) {

  let allCpk: any = [];

  cpkUsl.map((usl: any) => {
    cpkLsl.map((lsl: any) => {
      if (lsl.keterangan == usl.keterangan) {
        allCpk.push({
          ...lsl,
          cpkUsl: usl.cpkUsl,
          allCpk: Math.min(usl.cpkUsl, lsl.cpkLsl).toFixed(2)
        })
      }
    })
  })

  console.log(allCpk)

  return allCpk;
}


getKesimpulan() {

}

}
