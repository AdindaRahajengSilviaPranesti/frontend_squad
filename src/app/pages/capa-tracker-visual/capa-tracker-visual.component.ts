import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';

@Component({
  selector: 'app-capa-tracker-visual',
  templateUrl: './capa-tracker-visual.component.html',
  styleUrls: ['./capa-tracker-visual.component.scss']
})
export class CapaTrackerVisualComponent implements OnInit {
//FILTER SUPPLIER PERFOMANCE
// 4 Kotak Arrival, Abnormal, etc
//MASUK PIE CHART 6 kotak + GRADE
// HISTORICAL FINDING ABNORMAL CHART
  material: any;
  selectedDate: any;
  dateForm!: UntypedFormGroup;
  dateHistorical!: UntypedFormGroup;
  dateAnalysisForm!: UntypedFormGroup;
  jenis: any;
  types: any;
  type: any;
  abnormals: any;
  abnormalsByPlan: any;
  abnormal: any;
  gradientDonutChart: any;
  gradientDonutChart2: any;
  gradientDonutChart3: any;
  gradientDonutChart4: any;
  gradientDonutChart5: any;
  gradientDonutChart6: any;
  basicChart: any;
  abnormalities: any;
  vendor: any = "---Supplier---";
  arrival: any;
  arrivals: any;
  rateabnormals: any;
  rateabnormal: any;
  rateab: any = "---Supplier---";
  totalArrival: any;
  closing: any;
  closings: any;
  feedback: any;
  feedbacks: any;
  effective: any;
  effectiveness: any;
  downtime: any;
  downtimes: any;
  cuscomplain: any;
  cuscomplains: any;
  issue: any;
  issues: any;
  historical: any;
  historicals: any;

  isTotal = false;
  open: number = 0;
  close: number = 0;

  //grade
  a: number = 0;
  b: number = 0;
  c: number = 0;
  d: number = 0;

  startHistorical: any;
  endHistorical: any;


  chosenYearHandler(normalizedYear: Date) {
    this.selectedDate = normalizedYear;
  }

  constructor(private restApiService: restApiService, private fb: UntypedFormBuilder) {

  }

  ngOnInit(): void {

    const today = new Date();

    // Format the date as YYYY-MM-DD (required format for input type date)
    const formattedDate = today.toISOString().split('T')[0];
    const currentYear = new Date().getFullYear();

    // this.DateSelected = formattedDate;
    this.dateForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    })

    this.dateHistorical = this.fb.group({
      startDate: [''],
      endDate: ['']
    })

    this.getAbnormal()
    this._gradientDonutChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart2('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart3('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart4('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart5('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._gradientDonutChart6('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', 4, 0);
    this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]', [], [], currentYear, currentYear);
  }

  get f() {
    return this.dateForm.controls;
  }

  get form() {
    return this.dateHistorical.controls;
  }


//FILTER SUPPLIER PERFOMANCE
getAbnormal() {
  firstValueFrom(this.restApiService.getAbnormal())
    .then((res: any) => {
      this.abnormals = res;

    })
}

getAbnormalByPlan(plan: any) {
  console.log(plan.target.value)
  firstValueFrom(this.restApiService.getAbnormalByPlan(plan.target.value))
    .then((res: any) => {
      this.abnormalsByPlan = res;

    })
}

// 4 Kotak Arrival, Abnormal, etc
getArrival() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getArrival(startDate, endDate, this.rateab.kode_vendor))
    .then((res: any) => {
      this.arrivals = res;
      this.totalArrival = this.arrivals.length;
      // console.log(this.abnormalities[0].total);
      console.log(this.totalArrival);
    })
}

getRateabnormall() {
  return parseFloat(((this.abnormalities) / (this.totalArrival)).toFixed(2));
}

getClosing() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getClosing(startDate, endDate, this.rateab.kode_vendor))
    .then((res: any) => {
      this.closings = res;
      this.open = 0;
      this.close = 0;
      this.closings.map((row: any) => { //memeriksa setiap item dalam daftar closings. 
        if (row.status_complain <= 5) {
          this.open += 1; // Jika angka status_complain dalam item kurang atau sama dengan 5, artinya masalah ini masih terbuka. 
          //Jadi, kita menambah satu ke variabel open (menandakan ada satu lagi masalah terbuka).
        } else if (row.status_complain == 6) {
          this.close += 1;
          //Jika status_complain sama dengan 6, itu artinya masalah ini sudah ditutup. 
          //Jadi, kita menambah satu ke variabel close (menandakan ada satu lagi masalah yang terselesaikan).
        }
      });
    })
}


//MASUK PIE CHART 6 kotak + GRADE
//%abnormality
getRateabnormal() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getRateabnormal(startDate, endDate, this.vendor.kode_vendor))
    .then((res: any) => {
      this.rateabnormals = res;
      let test = 4 - this.rateabnormals[0].avg;
      console.log("abnormal",this.rateabnormals[0].avg, test)
      this._gradientDonutChart('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', this.rateabnormals[0].avg, test);
      // console.log(this.rateabnormal)
    })
}

getFeedback() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getFeedback(startDate, endDate, this.vendor.kode_vendor))
    .then((res: any) => {
      this.feedbacks = res;
      let feeds = 4 - this.feedbacks[0].avg;
      console.log(this.feedbacks[0].avg, feeds)
      this._gradientDonutChart2('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', this.feedbacks[0].avg, feeds);
      // console.log(this.rateabnormal)
    })
}

getEffectiveness() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getFeedback(startDate, endDate, this.vendor.kode_vendor))
    .then((res: any) => {
      this.effectiveness = res;
      let efc = 4 - this.effectiveness[0].avg;
      console.log(this.effectiveness[0].avg, efc)
      this._gradientDonutChart3('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', this.effectiveness[0].avg, efc);
      // console.log(this.rateabnormal)
    })
}

getDowntime() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getDowntime(startDate, endDate, this.vendor.kode_vendor))
    .then((res: any) => {
      this.downtimes = res;
      let efc = 4 - this.downtimes[0].avg;
      console.log(this.downtimes[0].avg, efc)
      this._gradientDonutChart4('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', this.downtimes[0].avg, efc);
      // console.log(this.rateabnormal)
    })
}

getCuscomplain() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getCuscomplain(startDate, endDate, this.vendor.kode_vendor))
    .then((res: any) => {
      this.cuscomplains = res;
      let efc = 4 - this.cuscomplains[0].avg;
      console.log(this.cuscomplains[0].avg, efc)
      this._gradientDonutChart5('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', this.cuscomplains[0].avg, efc);
      // console.log(this.rateabnormal)
    })
}

getIssue() {
  let startDate = this.f['startDate']?.value;
  let endDate = this.f['endDate']?.value;
  firstValueFrom(this.restApiService.getIssue(startDate, endDate, this.vendor.kode_vendor))
    .then((res: any) => {
      this.issues = res;
      let efc = 4 - this.issues[0].avg;
      console.log(this.issues[0].avg, efc)
      this._gradientDonutChart6('["--vz-primary", "--vz-success", "--vz-warning", "--vz-danger", "--vz-info"]', this.issues[0].avg, efc);
      // console.log(this.rateabnormal)
    })
}

getGrade(a:any, b:any, c:any, d:any, e:any, f:any) {
  let grade;
  let avg = (a + b + c + d + e + f)/6;

  if (avg >= 4) {
    grade = "A";
  }else if(avg >= 3.50){
    grade = "B";
  }else if(avg >= 2.00){
    grade = "C"
  }else{
    grade = "E"
  }

  return grade;
}



/**
* Chart Supplier Perfomance
*/
  //Abnormality
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

  //Feedback
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

  //CAPA Effectiveness
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

  //DOWNTIME
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

  //CUSTOMER COMPLAIN
  private _gradientDonutChart5(colors: any, s: number, e: number) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart5 = {
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

  //ADDITIONAL ISSUE
  private _gradientDonutChart6(colors: any, s: number, e: number) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart6 = {
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



// HISTORICAL FINDING ABNORMAL CHART
  getHistorical() {
    let startDate = this.form['startDate']?.value;
    startDate = startDate.split("-")[0]
    let endDate = this.form['endDate']?.value;
    endDate = endDate.split("-")[0]

    this.startHistorical= startDate;
    this.endHistorical= endDate;
    let start:any =[0,0,0,0,0,0,0,0,0,0,0,0];
    let start_total = 0;
    let end:any =[0,0,0,0,0,0,0,0,0,0,0,0];
    let end_total = 0;
    firstValueFrom(this.restApiService.getHistorical(startDate, this.vendor.kode_vendor))
      .then((res: any) => {
        this.historicals = res;
        console.log(this.historicals)
        console.log(this.historicals[1])
      
        this.historicals.map((row:any) => {
          start[row.bulan] = row.jumlah_transaksi
          start_total += row.jumlah_transaksi
        })
        start[0] = start_total;

        console.log(start)

        this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]', start, end, startDate, endDate);
      })
    firstValueFrom(this.restApiService.getHistorical(endDate, this.vendor.kode_vendor))
      .then((res: any) => {
        this.historicals = res;
        console.log(this.historicals)
        console.log(this.historicals[1])
      
        this.historicals.map((row:any) => {
          end[row.bulan] = row.jumlah_transaksi
          end_total += row.jumlah_transaksi
        })
        end[0] = end_total;

        console.log(end)

        this._basicChart('["--vz-gray-300", "--vz-primary", "--vz-info"]', start, end, startDate, endDate);
      })


  }

    /**
* Historical Supplier Charts
*/
private _basicChart(colors: any, start:any, end:any, startDate:any, endDate:any) {
  colors = this.getChartColorsArray(colors);
  this.basicChart = {
    series: [
      {
        name: startDate,
        data: start,
      },
      {
        name: endDate,
        data: end,
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
      enabled: true,
      style: {
        colors: ['#0C0C0C'], // Warna tulisan (merah)
      },
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    colors: ['#8EACCD', '#F6995C'], // Warna orange dan biru
    xaxis: {
      categories: [
        "Total",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      title: {
        text: "$ (thousands)",
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
        formatter: function (val: any) {
          return "$ " + val + " thousands";
        },
      },
    },
  };
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






  getData() {
    this.getAbnormality();
    this.getRateabnormal();
    this.getArrival();
    this.getClosing();
    this.getFeedback();
    this.getEffectiveness();
    this.getDowntime();
    this.getCuscomplain();
    this.getIssue();
  }

  //4 kotak awal ( abnormality, rate abnormal)
  getAbnormality() {
    let startDate = this.f['startDate']?.value;
    let endDate = this.f['endDate']?.value;
    console.log(this.vendor)
    firstValueFrom(this.restApiService.getAbnormality(startDate, endDate, this.vendor.kode_vendor))
      .then((res: any) => {
        this.abnormalities = res;
        console.log("total abnormalities",this.abnormalities[0].total) //mencetak jumlah total dari data abnormalities 

      })
  }



}
