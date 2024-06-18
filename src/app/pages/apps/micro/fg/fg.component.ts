import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { restApiService } from 'src/app/core/services/rest-api.service';
import * as moment from 'moment';

@Component({
  selector: 'app-fg',
  templateUrl: './fg.component.html',
  styleUrls: ['./fg.component.scss']
})
export class FgComponent {
  formAl4!: FormGroup;
  formNami!: FormGroup;
  formCan!: FormGroup;
  formPet!: FormGroup;

  lineFgAl4: any;
  lineFgNami: any;
  lineFgCan: any;
  lineFgPet: any;

  defaultFormSubmit = {
    micro: 'tb',
    area: '1',
    start: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD')
  };


  constructor(public restApiServices: restApiService, private FormBuilder: FormBuilder) {

  }


  ngOnInit(): void {
    // FORM VALIDATION
    this.formAl4 = this.FormBuilder.group({
      micro: ['Pilih Micro', Validators.required],
      area: ['Area Sampling', Validators.required],
      date: ['', Validators.required],
    });

    this.formAl4.valueChanges.subscribe((formData) => {
      if (this.formAl4.valid) {
        this.onSubmit('air al4', formData);
      }
    });

    this.formNami = this.FormBuilder.group({
      micro: ['Pilih Micro', Validators.required],
      area: ['Area Sampling', Validators.required],
      date: ['', Validators.required],
    });

    this.formNami.valueChanges.subscribe((formData) => {
      if (this.formNami.valid) {
        this.onSubmit('air nami', formData);
      }
    });

    this.formCan = this.FormBuilder.group({
      micro: ['Pilih Micro', Validators.required],
      area: ['Area Sampling', Validators.required],
      date: ['', Validators.required],
    });

    this.formCan.valueChanges.subscribe((formData) => {
      if (this.formCan.valid) {
        // Panggil fungsi onSubmit jika form sudah terisi
        this.onSubmit('air can', formData);
      }
    });

    this.formPet = this.FormBuilder.group({
      micro: ['Pilih Micro', Validators.required],
      area: ['Area Sampling', Validators.required],
      date: ['', Validators.required],
    });

    this.formPet.valueChanges.subscribe((formData) => {
      if (this.formPet.valid) {
        // Panggil fungsi onSubmit jika form sudah terisi
        this.onSubmit('air pet', formData);
      }
    });
    // FORM VALIDATION


    // DEFAULT CHART
    this.restApiServices.fgSamplingAl4(this.defaultFormSubmit).subscribe(data => {
      let airAl4 = data;
      console.log('fg al4', airAl4);
      this._lineChartWaterAl4(this.defaultFormSubmit, airAl4)

    })
    this.restApiServices.fgSamplingNami(this.defaultFormSubmit).subscribe(data => {
      let airNami = data;
      console.log('fg Nami', airNami);
      this._lineChartWaterNami(this.defaultFormSubmit, airNami)

    })
    this.restApiServices.fgSamplingCan(this.defaultFormSubmit).subscribe(data => {
      let airCan = data;
      console.log('fg Can', airCan);
      this._lineChartWaterCan(this.defaultFormSubmit, airCan)

    })
    this.restApiServices.fgSamplingPet(this.defaultFormSubmit).subscribe(data => {
      let airPet = data;
      console.log('fg pet', airPet);
      this._lineChartWaterPet(this.defaultFormSubmit, airPet)

    })
    // END DEFAULT CHART
  }

  onSubmit(air: any, formData: any) {
    console.log('jenis:', air);
    console.log('form:', formData);

    let submit = {
      micro: formData.micro,
      area: formData.area,
      start: moment(formData.date.from).format('Y-MM-DD'),
      end: moment(formData.date.to).format('Y-MM-DD')
    };

    if (air === 'air al4' && formData.micro != 'Pilih Micro' && formData.area != 'Area Sampling' && formData.date.from != undefined && formData.date.to != undefined) {
      this.restApiServices.fgSamplingAl4(submit).subscribe(data => {
        let airAl4 = data;
        console.log('water al4', airAl4);
        this._lineChartWaterAl4(submit, airAl4)

      })

    } else if (air === 'air nami' && formData.micro != 'Pilih Micro' && formData.area != 'Area Sampling' && formData.date.from != undefined && formData.date.to != undefined) {
      this.restApiServices.fgSamplingNami(submit).subscribe(data => {
        let airNami = data;
        console.log('water nami', airNami);
        this._lineChartWaterNami(submit, airNami)

      })
    } else if (air === 'air can' && formData.micro != 'Pilih Micro' && formData.area != 'Area Sampling' && formData.date.from != undefined && formData.date.to != undefined) {
      this.restApiServices.fgSamplingCan(submit).subscribe(data => {
        let airCan = data;
        console.log('water can', airCan);
        this._lineChartWaterCan(submit, airCan)

      })
    } else if (air === 'air pet' && formData.micro != 'Pilih Micro' && formData.area != 'Area Sampling' && formData.date.from != undefined && formData.date.to != undefined) {
      this.restApiServices.fgSamplingPet(submit).subscribe(data => {
        let airPet = data;
        console.log('water pet', airPet);
        this._lineChartWaterPet(submit, airPet)

      })
    }
  }


  private _lineChartWaterAl4(formSubmit: any, data: any) {
    this.lineFgAl4 = {
      chart: {
        height: 380,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
          autoSelected: 'download',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3, 3],
        curve: 'straight'
      },
      series: [{
        name: formSubmit.micro,
        data: data.map((item: any) => {
          return item[formSubmit.micro]
        })
      }
      ],
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
        categories: data.map((item: any) => {
          return moment(item.tgl_sampling).format('DD-MM-Y')
        }),
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agst'],
        title: {
          text: 'Date'
        }
      },
      yaxis: {
        title: {
          text: 'Quantity'
        },
        // min: 5,
        // max: 40
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      }
    };
  }

  private _lineChartWaterNami(formSubmit: any, data: any) {
    this.lineFgNami = {
      chart: {
        height: 380,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
          autoSelected: 'download',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3, 3],
        curve: 'straight'
      },
      series: [{
        name: formSubmit.micro,
        data: data.map((item: any) => {
          return item[formSubmit.micro]
        })
      }
      ],
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
        categories: data.map((item: any) => {
          return moment(item.tgl_sampling).format('DD-MM-Y')
        }),
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agst'],
        title: {
          text: 'Date'
        }
      },
      yaxis: {
        title: {
          text: 'Quantity'
        },
        // min: 5,
        // max: 40
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      }
    };
  }

  private _lineChartWaterCan(formSubmit: any, data: any) {
    this.lineFgCan = {
      chart: {
        height: 380,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
          autoSelected: 'download',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3, 3],
        curve: 'straight'
      },
      series: [{
        name: formSubmit.micro,
        data: data.map((item: any) => {
          return item[formSubmit.micro]
        })
      }
      ],
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
        categories: data.map((item: any) => {
          return moment(item.tgl_sampling).format('DD-MM-Y')
        }),
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agst'],
        title: {
          text: 'Date'
        }
      },
      yaxis: {
        title: {
          text: 'Quantity'
        },
        // min: 5,
        // max: 40
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      }
    };
  }

  private _lineChartWaterPet(formSubmit: any, data: any) {
    this.lineFgPet = {
      chart: {
        height: 380,
        type: 'line',
        zoom: {
          enabled: false
        },
        toolbar: {
          show: true,
          tools: {
            download: true,
          },
          autoSelected: 'download',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [3, 3],
        curve: 'straight'
      },
      series: [{
        name: formSubmit.micro,
        data: data.map((item: any) => {
          return item[formSubmit.micro]
        })
      }
      ],
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
        categories: data.map((item: any) => {
          return moment(item.tgl_sampling).format('DD-MM-Y')
        }),
        // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agst'],
        title: {
          text: 'Date'
        }
      },
      yaxis: {
        title: {
          text: 'Quantity'
        },
        // min: 5,
        // max: 40
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
      }
    };
  }
}
