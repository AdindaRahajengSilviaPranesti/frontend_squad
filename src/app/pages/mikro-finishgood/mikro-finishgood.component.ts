import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { restApiService } from '../../core/services/rest-api.service';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import * as moment from 'moment';
import { er } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-mikro-finishgood',
  templateUrl: './mikro-finishgood.component.html',
  styleUrls: ['./mikro-finishgood.component.scss']
})
export class MikroFinishgoodComponent implements OnInit {
  date = new Date();
  currentYear = this.date.getFullYear();
  StackedColumn100Chart: any;
  dateForm!: UntypedFormGroup;
  parameters: any = "---Lot FSB---";
  products: any = "---Product FSB---";
  parameterocs: any = "---Lot OC---";
  yearocs: any = "---Year OC---";
  productocs: any = "---Product OC---";
  typeParameters: any;
  progressanalysisfsb: any;
  statusApproveCount: number = 0; // Add property to store the count
  typeParametersOc: any;
  productOcLine:any;
  
  paFsb:any = [];
  waFsb:any = [];
  progresAnalysisFsb: number= 0;
  waitingApprovalFsb: number= 0;
  parameterOcLine:any = [];
  waterOcLine:any = [];


  paOc:any = [];
  waOc:any = [];
  progresAnalysisOc: number= 0;
  waitingApprovalOc: number= 0;
  

  // 
  parameter: any;
  parameteroc: any;
  typeParameter: any;
  totalOc: any;
  product: any;
  progressanalysisf: any;
  years: number[] = []; // Array untuk daftar tahun
  selectedYear: number | undefined; // Variabel untuk tahun yang dipilih

  constructor(private restApiService: restApiService, private fb: UntypedFormBuilder) { 
    const currentYear = new Date().getFullYear();
    for (let year = 2000; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {
    const today = new Date();
    // this._StackedColumn100Chart('["--vz-primary", "--vz-info", "--vz-gray-300"]');
    this.getParameter();
    this.getParameteroc();
    this.getChart();

    // Format the date as YYYY-MM-DD (required format for input type date)
    const formattedDate = today.toISOString().split('T')[0];
    this.dateForm = this.fb.group({
      startDate: [formattedDate],
      endDate: [formattedDate]
    });

    // Fetch progress analysis data for today and count status_approve
    this.getPanalysisfsb(moment().format('YYYY-MM-DD'));
    this.getProwaitingoc(moment().format('YYYY-MM-DD'));
  }

  get form() {
    return this.dateForm.controls;
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
        } else return newValue;
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
   * Stacked Column 100
   */
  private _StackedColumn100Chart(colors: any) {
    let oc1:any = new Array(12).fill(0);
    let oc2:any = new Array(12).fill(0);

    this.totalOc.map((row:any) => {
      oc1[row.bulan - 1] = row.oc1;
      oc2[row.bulan - 1] = row.oc2;    
    })

    console.log("oc1", oc1)
    colors = this.getChartColorsArray(colors) || ['#008DDA', '#5AB2FF', '#A0DEFF','#FF7D29', '#FFEEA9', '#41B06E'];
    this.StackedColumn100Chart = {
      series: [{
        name: "Total Lot OC1",
        data:oc1,
      },
      {
        name: "Out STD OC1",
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      },
      {
        name: "Total Lot OC2",
        data: oc2,
      },
      {
        name: "Out STD OC2",
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      },
      {
        name: "Total Lot FSB",
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      },
      {
        name: "Out STD OC2",
        data: [11, 17, 15, 15, 21, 14, 15, 13],
      },
      
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        toolbar: {
          show: true,
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
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
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
      colors: ['#008DDA', '#5AB2FF', '#A0DEFF','#FF7D29', '#FFEEA9', '#41B06E'],
    };
  }

  getParameter() {
    firstValueFrom(this.restApiService.getParameterfg())
      .then((res: any) => {
        this.parameters = res;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getProduct() {
    this.product = ''; //agar value awalnya kosong dahulu
    firstValueFrom(this.restApiService.getProduct(this.parameter.product, this.parameter.lotno))
      .then((res: any) => {
        this.products = res;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getParameteroc() {
    firstValueFrom(this.restApiService.getParameteroc())
      .then((res: any) => {
        this.parameterocs = res;
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //year OC LINE FILTER
  getYearoc() {
    firstValueFrom(this.restApiService.getYearoc())
      .then((res: any) => {
        this.yearocs = res;
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }


  getProductoc() {
    this.productocs = '';
    firstValueFrom(this.restApiService.getProductoc(this.parameteroc.product, this.parameteroc.lotno))
      .then((res: any) => {
        this.productocs = res;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getTypeParameter() {
    firstValueFrom(this.restApiService.getTypeParameter(this.product.product, this.product.lotno))
      .then((res: any) => {
        this.typeParameters = res;
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  getPanalysisfsb(date: string) {
    firstValueFrom(this.restApiService.getPanalysisfsb())
      .then((res: any) => {

        res.map((row:any) =>{
          if(row.status_approve == 0){
            this.paFsb.push(row)
            this.progresAnalysisFsb += 1;
          }else if(row.status_approve == 1){
            this.waFsb.push(row)
            this.waitingApprovalFsb += 1;
          }
        })

        console.log("pafb", this.paFsb)
        console.log("waFsb", this.waFsb)
        console.log("progres", this.progresAnalysisFsb);
        console.log("waiting", this.waitingApprovalFsb);
        // this.progressanalysisfsb = res;
        // this.statusApproveCount = res.length; // Set the count of results to statusApproveCount
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  async getTypeParameterOc() {
    let body = {
      year: this.selectedYear,
      product: this.productOcLine.product_t,
      lotno: this.parameteroc.lotno 
    }
    // firstValueFrom(this.restApiService.getTypeParameterOc(body))
    //   .then((res: any) => {
    //     console.log(this.parameteroc.lotno, this.productOcLine)
    //     console.log(res)
    //     res.map((row:any) =>{
    //       row.id_group == 60 ? this.parameterOcLine.push(row): this.waterOcLine.push(row);
    //     })

    //     console.log(this.parameterOcLine)
    //     console.log(this.waterOcLine)
    //   })
    //   .catch((error: any) => {
    //     console.error(error);
    //   });
    try {
      this.parameterOcLine = await firstValueFrom(this.restApiService.getTypeParameterOc(body));
      this.waterOcLine = await firstValueFrom(this.restApiService.getTypeParameterOcWater(body));

      console.log(this.parameterOcLine);
      console.log(this.waterOcLine);
    } catch (error) {
      console.log(error);
    }
  }

  getTypeParameterOcWater() {
    let body = {
      product: this.productOcLine.product_t,
      lotno: this.parameteroc.lotno 
    }

    console.log("body", body)
    firstValueFrom(this.restApiService.getTypeParameterOcWater(body))
      .then((res: any) => {
        console.log(this.parameteroc.lotno, this.productOcLine)
        console.log(res)
        res.map((row:any) =>{
          row.id_group == 60 ? this.parameterOcLine.push(row): this.waterOcLine.push(row);
        })

        console.log(this.parameterOcLine)
        console.log(this.waterOcLine)
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  //milik OC --> Progress & waiting approval 
  getProwaitingoc(date: string) {
    firstValueFrom(this.restApiService.getProwaitingoc())
      .then((res: any) => {

        res.map((row:any) =>{
          if(row.status == 0){
            this.paOc.push(row)
            this.progresAnalysisOc += 1;
          }else if(row.status == 1){
            this.waOc.push(row)
            this.waitingApprovalOc += 1;
          }
        })

        console.log("paOC", this.paOc)
        console.log("waOC", this.waOc)
        console.log("progres", this.progresAnalysisOc);
        console.log("waiting", this.waitingApprovalOc);
        // this.progressanalysisfsb = res;
        // this.statusApproveCount = res.length; // Set the count of results to statusApproveCount
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  filterByYear() {
    // Implementasi untuk memfilter data berdasarkan tahun yang dipilih
    console.log('Selected year:', this.selectedYear);
    // Tambahkan logika untuk memfilter data parameterocs dan productocs berdasarkan selectedYear
  }

  getChart() {
    firstValueFrom(this.restApiService.getChart(2023))
      .then((res: any) => {
        this.totalOc = res;
        console.log("test", res);
        this._StackedColumn100Chart('["--vz-primary", "--vz-info", "--vz-gray-300"]');
      })
      .catch((error: any) => {
        console.error(error);
      });
  }


}
