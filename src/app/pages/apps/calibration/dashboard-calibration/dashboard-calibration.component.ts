import { Component, ElementRef, ViewChild, OnInit} from '@angular/core';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { NgFor, NgIf, NgClass } from '@angular/common'; 
import { NgbPagination, NgbHighlight, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { WorkSheet, utils, WorkBook, write } from 'xlsx';
import { log } from 'console';

@Component({
  selector: 'app-dashboard-calibration',
  templateUrl: './dashboard-calibration.component.html',
  styleUrls: ['./dashboard-calibration.component.scss'],
  // standalone: true,
  // imports: [ NgFor, NgIf, NgClass, NgbHighlight, NgbPagination, FormsModule, NgSelectModule ]
})

export class DashboardCalibrationComponent implements OnInit {
  public equipmentData: any;
  public regisData: any;
  public expiredData: any;
  public nowKalibrasiData: any;
  public planKalibrasiData: any;
  public dateFilterData: any;
  public allEquipmentData: any;
  public externalData: any;
  public summaryData: any;
  public registTableData: any;
  public allAreaData: any;

  public filteredKalibrasiData: any;
  public filteredData1: any;
  public filteredData2: any;
  public filteredData3: any;
  public filteredData4: any;
  public filteredData5: any;
  public editPlanKalibrasi: any;
  public editPlanData: any;

  searchTerm: string = '';
  dateValue: any;
  filteredDateNow: any;
  filteredDatePlan: any;
  filteredBackDateNow: any;
  filteredBackDatePlan: any;
  filteredDateSum: any;
  nextMonthName: any;
  monthName: any;
  monthSum: any;
  yearSum: any;
  currentMonth: string;

  breadCrumbItems!: Array<{}>;
  page1: number = 1;
  pageSize1: number = 10;
  startIndex1: number = 1;
  endIndex1: number = this.pageSize1;
  totalPages1: number = 0;
  page2: number = 1;
  pageSize2: number = 10;
  startIndex2: number = 1;
  endIndex2: number = this.pageSize2;
  totalPages2: number = 0;
  page3: number = 1;
  pageSize3: number = 10;
  startIndex3: number = 1;
  endIndex3: number = this.pageSize3;
  totalPages3: number = 0;
  page4: number = 1;
  pageSize4: number = 10;
  startIndex4: number = 1;
  endIndex4: number = this.pageSize4;
  totalPages4: number = 0;
  page5: number = 1;
  pageSize5: number = 10;
  startIndex5: number = 1;
  endIndex5: number = this.pageSize5;
  totalPages5: number = 0;

  startDate1: string = '';
  endDate1: string = '';
  startDate2: string = '';
  endDate2: string = '';
  startDate3: string = '';
  endDate3: string = '';
  startDate4: string = '';
  endDate4: string = '';
  startDate5: string = '';
  endDate5: string = '';

  paginatedItems1: any;
  paginatedItems2: any;
  paginatedItems3: any;
  paginatedItems4: any;
  paginatedItems5: any;
  isFiltered1: any;
  isFiltered2: any;
  isFiltered3: any;
  isFiltered4: any;
  isFiltered5: any;
  totalRecords1: any;
  totalRecords2: any;
  totalRecords3: any;
  totalRecords4: any;
  totalRecords5: any;

  isAreaFilter = false;
  selectedArea: any;
  areaValue1: any;
  areaValue2: any;
  public filteredAreaData1: any;
  public filteredAreaData2: any;
  page6: number = 1;
  pageSize6: number = 10;
  startIndex6: number = 1;
  endIndex6: number = this.pageSize6;
  totalPages6: number = 0;
  paginatedItems6: any;
  totalRecords6: any;

  
  constructor( public restApiServices: restApiService, private modalService: NgbModal ) {

    // GET CURRENT DATE
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2);
    this.currentMonth = year + '-' + month;

  }

  // getData() {
  //   setTimeout(() => {  
  //     this.restApiServices.getData().subscribe((res: any) => {
  //       this.nowKalibrasiData = res.data;
  //       this.filteredKalibrasiData = this.nowKalibrasiData;
  //       this.totalRecords = this.filteredKalibrasiData.length;
  //       console.log('cekcek', this.nowKalibrasiData);
  //     });
  //     document.getElementById("elmLoader")?.classList.add("d-none");
  //   }, 1000);
  // }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    const monthNames = [
      'Januari', 'Februari', 'Maret', 'April',
      'Mei', 'Juni', 'Juli', 'Agustus',
      'September', 'Oktober', 'November', 'Desember'
    ];
    const day = formattedDate.getDate();
    const monthIndex = formattedDate.getMonth();
    const year = formattedDate.getFullYear();
    return `${day} ${monthNames[monthIndex]} ${year}`;
  }

  formatDateInput(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    return year + '-' + month + '-' + day;
  }

  ngOnInit(): void {
    this.restApiServices.getEquipment()
    .subscribe(data=>{
      this.equipmentData = data.data[0]
      
    }, (error: any) => {
      console.error(error);
    });

    this.restApiServices.getRegis()
    .subscribe(data=>{
      this.regisData = data.data[0]
      
    }, (error: any) => {
      console.error(error);
    });

    this.restApiServices.getExpired()
    .subscribe(data=>{
      this.expiredData = data.data[0]
      
    }, (error: any) => {
      console.error(error);
    });

    this.restApiServices.postNowKalibrasi({date:this.currentMonth})
    .subscribe(data=>{
      console.log('lkj',this.currentMonth);
      
      this.nowKalibrasiData = data.data
      this.monthName = (data.data[0].month).toUpperCase();
      this.totalRecords1 = this.nowKalibrasiData.length;
      let items1 = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
      this.paginate1()
      
      console.log('abc',this.nowKalibrasiData);

    }, (error: any) => {
      console.error(error);
    });

    this.restApiServices.postPlanKalibrasi({date:this.currentMonth})
    .subscribe(data=>{
      this.planKalibrasiData = data.data
      this.nextMonthName = (data.data[1].next_month).toUpperCase();
      this.totalRecords2 = this.planKalibrasiData.length;
      let items2 = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
      this.paginate2()

    }, (error: any) => {
      console.error(error);
    });

    this.restApiServices.calibrationSummary({date:this.currentMonth})
    .subscribe(data=>{
      this.summaryData = data.data
      this.monthSum = (data.data[2].month).toUpperCase();
      // this.yearSum = (data.data[2].year).toUpperCase();
      this.totalRecords4 = this.summaryData.length;
      let items4 = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
      this.paginate4()
      console.log('haha', this.summaryData);
      

    }, (error: any) => {
      console.error(error);
    });

    // this.restApiServices.dateFilter(this.dateValue)
    // .subscribe(data=>{
    //   this.dateFilterData = data.data
    //   console.log(this.dateFilterData);
      
    // }, (error: any) => {
    //   console.error(error);
    // });

    this.restApiServices.getRegistTable()
    .subscribe(data=>{
      this.registTableData = data.data
      this.totalRecords5 = this.registTableData.length;
      let items5 = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
      this.paginate5()
      
    }, (error: any) => {
      console.error(error);
    });

    this.restApiServices.getAllEquipment()
    .subscribe(data=>{
      this.allEquipmentData = data.data
      this.totalRecords3 = this.allEquipmentData.length;
      let items3 = Array.from({ length: 100 }).map((_, i) => `Item #${i + 1}`);
      this.paginate3()

    }, (error: any) => {
      console.error(error);
    });

    console.log('data');
    this.restApiServices.getExternal()
    .subscribe(data=>{
      this.externalData = data.data[0]
      
    }, (error: any) => {
      console.error(error);
    });

    // this.paginate1();
    // this.paginate2();

    this.restApiServices.getAllArea()
    .subscribe(data => {
      this.allAreaData = data.data
      console.log('coba_area', this.allAreaData);

    }, (error: any) => {
      console.error(error);
    });

  }

  // ============================================= DATE FILTER =============================================

  dateFilter(event:any){
    // console.log(event.target.value);
    this.dateValue = event.target.value;
    console.log(this.dateValue);

    // this.dateValue2 = (event.target.value.getMonth() + 1);
    // console.log(this.dateValue2);

    this.restApiServices.dateFilter({date:this.dateValue})
    .subscribe(data=>{
      this.filteredDateNow = data.data[0]
      console.log('date now',this.filteredDateNow);
      this.paginate1()
      this.totalRecords1 = this.filteredDateNow.length

      this.filteredDatePlan = data.data[1]
      console.log('date plan',this.filteredDatePlan);
      this.paginate2()
      this.totalRecords2 = this.filteredDatePlan.length

      this.filteredDateSum = data.data[2]
      console.log('date sum',this.filteredDateSum);
      this.paginate4()
      this.totalRecords4 = this.filteredDateSum.length

      // this.filteredBackDateNow = data.data[0]
      // console.log('back date now',this.filteredDateNow);
      // this.paginate1()
      // this.totalRecords1 = this.filteredDateNow.length

      // this.filteredBackDatePlan = data.data[2]
      // console.log('back date plan',this.filteredDatePlan);
      // this.paginate2()
      // this.totalRecords2 = this.filteredDatePlan.length

      this.monthName = (data.data[0][0].month).toUpperCase();
      console.log('month now',this.monthName);
      this.nextMonthName = (data.data[1][0].next_month).toUpperCase();
      console.log('month next',this.nextMonthName);
      this.monthSum = (this.filteredDateSum[0].month).toUpperCase();
      console.log('=',this.filteredDateSum[0]);
      // this.yearSum = (this.filteredDateSum[0].year).toUpperCase();

    }, (error: any) => {
      console.error(error);
    });

  }
  
  // ============================================= PAGINATION =============================================

  // PAGINATION KALIBRASI NOW
  getShowingText1(): string {
    const startIndex = (this.page1 - 1) * this.pageSize1 + 1;
    const endIndex = Math.min(this.page1 * this.pageSize1, this.totalRecords1);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  setPaginationData1() {
    this.totalPages1 = Math.ceil(this.totalRecords1 / this.pageSize1);
  }

  paginate1() {
    const start = (this.page1 - 1) * this.pageSize1;
    const end = start + this.pageSize1;
    if (this.isFiltered1) {
      console.log('filtered',this.filteredData1);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.paginatedItems1 = this.filteredData1.slice(start, end);
    
    } else if(this.dateValue) {
      console.log('date filtered 1',this.filteredDateNow);
      this.paginatedItems1 = this.filteredDateNow.slice(start, end);

    } else{
      console.log('not filtered');
      this.paginatedItems1 = this.nowKalibrasiData.slice(start, end);
      console.log('data table 1', this.paginatedItems1);

    }
    console.log('dataCal1', this.paginatedItems1);
    console.log('setelah_filter', this.filteredDateNow);
    
  }

  onPageChange1(page: number) {
    this.page1 = page;
    this.paginate1();
  }


  // PAGINATION PLAN KALIBRASI
  getShowingText2(): string {
    const startIndex = (this.page2 - 1) * this.pageSize2 + 1;
    const endIndex = Math.min(this.page2 * this.pageSize2, this.totalRecords2);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  setPaginationData2() {
    this.totalPages2 = Math.ceil(this.totalRecords2 / this.pageSize2);
  }

  paginate2() {
    const start = (this.page2 - 1) * this.pageSize2;
    const end = start + this.pageSize2;
    if (this.isFiltered2) {
      console.log('filtered',this.filteredData2);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.paginatedItems2 = this.filteredData2.slice(start, end);

    } else if(this.dateValue) {
      console.log('date filtered 2',this.filteredDatePlan);
      this.paginatedItems2 = this.filteredDatePlan.slice(start, end);

    } else{
      console.log('not filtered');
      this.paginatedItems2 = this.planKalibrasiData.slice(start, end);

    }
    console.log('dataCal2', this.paginatedItems2);
  }

  onPageChange2(page: number) {
    this.page2 = page;
    this.paginate2();
  }


  // PAGINATION ALL EQUIPMENT
  getShowingText3(): string {
    const startIndex = (this.page3 - 1) * this.pageSize3 + 1;
    const endIndex = Math.min(this.page3 * this.pageSize3, this.totalRecords3);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  setPaginationData3() {
    this.totalPages3 = Math.ceil(this.totalRecords3 / this.pageSize3);
  }

  paginate3() {
    const start = (this.page3 - 1) * this.pageSize3;
    const end = start + this.pageSize3;
    if (this.isFiltered3) {
      console.log('filtered',this.filteredData3);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.paginatedItems3 = this.filteredData3.slice(start, end);

    } else if(this.areaValue1) {
      console.log('area_filtered1',this.filteredAreaData1);
      this.paginatedItems3 = this.filteredAreaData1.slice(start, end);

    } else{
      console.log('not filtered');
      this.paginatedItems3 = this.allEquipmentData.slice(start, end);

    }
    console.log('dataCal3', this.paginatedItems3);
  }

  onPageChange3(page: number) {
    this.page3 = page;
    this.paginate3();
  }
  

  // PAGINATION CALIBRATION SUMMARY
  getShowingText4(): string {
    const startIndex = (this.page4 - 1) * this.pageSize4 + 1;
    const endIndex = Math.min(this.page4 * this.pageSize4, this.totalRecords4);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  setPaginationData4() {
    this.totalPages4 = Math.ceil(this.totalRecords4 / this.pageSize4);
  }

  paginate4() {
    const start = (this.page4 - 1) * this.pageSize4;
    const end = start + this.pageSize4;
    if (this.isFiltered4) {
      console.log('filtered',this.filteredData4);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.paginatedItems4 = this.filteredData4.slice(start, end);
    
    } else if(this.dateValue) {
      console.log('date filtered 4',this.filteredDateSum);
      this.paginatedItems4 = this.filteredDateSum.slice(start, end);

    } else if(this.areaValue2) {
      console.log('area_filtered2',this.filteredAreaData2);
      this.paginatedItems3 = this.filteredAreaData2.slice(start, end);

    } else{
      console.log('not filtered');
      this.paginatedItems4 = this.summaryData.slice(start, end);
      console.log('data table 1', this.paginatedItems4);
    }

    console.log('dataCal4', this.paginatedItems4);
    console.log('setelah_filter', this.filteredDateSum);
    
  }
  
  onPageChange4(page: number) {
    this.page4 = page;
    this.paginate4();
  }  
  

  // PAGINATION REGISTRATION TABLE
  getShowingText5(): string {
    const startIndex = (this.page5 - 1) * this.pageSize5 + 1;
    const endIndex = Math.min(this.page5 * this.pageSize5, this.totalRecords5);
    return `Showing ${startIndex} - ${endIndex}`;
  }

  setPaginationData5() {
    this.totalPages5 = Math.ceil(this.totalRecords5 / this.pageSize5);
  }

  paginate5() {
    const start = (this.page5 - 1) * this.pageSize5;
    const end = start + this.pageSize5;
    if (this.isFiltered5) {
      console.log('filtered',this.filteredData5);
      console.log('filtered start',start);
      console.log('filtered end',end);
      this.paginatedItems5 = this.filteredData5.slice(start, end);

    } else{
      console.log('not filtered');
      this.paginatedItems5 = this.registTableData.slice(start, end);

    }
    console.log('dataCal5', this.paginatedItems5);
  }

  onPageChange5(page: number) {
    this.page5 = page;
    this.paginate5();
  }  
    

  // ============================================= SEARCH =============================================

  // SEARCH NOW KALIBRASI
  filterUpdate1(event:any) {
    console.log('search',event.target.value);
    console.log('data',this.nowKalibrasiData);
    const val1 = event.target.value.toLowerCase();
    this.isFiltered1 = val1;

    const temp1 = this.nowKalibrasiData.filter(function (d:any) {
      const eq_no1 = d.equipment_number ? d.equipment_number.toLowerCase() : '';
      const eq_name1 = d.equipment_name ? d.equipment_name.toLowerCase() : '';
      const dept1 = d.departement ? d.departement.toLowerCase() : '';
      const area1 = d.area ? d.area.toLowerCase() : '';
      return (
        eq_no1.toLowerCase().indexOf(val1) !== -1 ||
        eq_name1.toLowerCase().indexOf(val1) !== -1 ||
        dept1.toLowerCase().indexOf(val1) !== -1 ||
        area1.toLowerCase().indexOf(val1) !== -1 ||
        !val1
      );
    });
    console.log(temp1.length);
    this.totalRecords1 = temp1.length
    // this.paginatedItems1 = temp1;
    this.filteredData1 = temp1;
    this.paginate1()
    // this.finalFilter = this.isFiltered;    
    // this.table.offset = 0;
  }


  // SEARCH PLAN KALIBRASI
  filterUpdate2(event:any) {
    console.log('search',event.target.value);
    console.log('data',this.planKalibrasiData);
    const val2 = event.target.value.toLowerCase();
    this.isFiltered2 = val2;

    const temp2 = this.planKalibrasiData.filter(function (d:any) {
      const eq_no2 = d.equipment_number ? d.equipment_number.toLowerCase() : '';
      const eq_name2 = d.equipment_name ? d.equipment_name.toLowerCase() : '';
      const dept2 = d.departement ? d.departement.toLowerCase() : '';
      const area2 = d.area ? d.area.toLowerCase() : '';
      return (
        eq_no2.toLowerCase().indexOf(val2) !== -1 ||
        eq_name2.toLowerCase().indexOf(val2) !== -1 ||
        dept2.toLowerCase().indexOf(val2) !== -1 ||
        area2.toLowerCase().indexOf(val2) !== -1 ||
        !val2
      );
    });
    console.log(temp2.length);
    this.totalRecords2 = temp2.length
    this.filteredData2 = temp2;
    this.paginate2()
  }


  // SEARCH ALL EQUIPMENT
  filterUpdate3(event:any) {
    console.log('search',event.target.value);
    console.log('data',this.allEquipmentData);
    const val3 = event.target.value.toLowerCase();
    this.isFiltered3 = val3;

    const temp3 = this.allEquipmentData.filter(function (d:any) {
      const eq_no3 = d.equipment_number ? d.equipment_number.toLowerCase() : '';
      const eq_name3 = d.equipment_name ? d.equipment_name.toLowerCase() : '';
      const dept3 = d.departement ? d.departement.toLowerCase() : '';
      const area3 = d.area ? d.area.toLowerCase() : '';
      const tgl_kal = d.tanggal_calibration ? d.tanggal_calibration.toLowerCase() : '';
      const plan_kal = d.plan_kalibrasi ? d.plan_kalibrasi.toLowerCase() : '';
    
      return (
        eq_no3.toLowerCase().indexOf(val3) !== -1 ||
        eq_name3.toLowerCase().indexOf(val3) !== -1 ||
        dept3.toLowerCase().indexOf(val3) !== -1 ||
        area3.toLowerCase().indexOf(val3) !== -1 ||
        tgl_kal.toLowerCase().indexOf(val3) !== -1 ||
        plan_kal.toLowerCase().indexOf(val3) !== -1 ||
        !val3
      );
    });
    console.log(temp3.length);
    this.totalRecords3 = temp3.length
    this.filteredData3 = temp3;
    this.paginate3()

  }

  // SEARCH SUMMARY DATA
  filterUpdate4(event:any) {
    console.log('search',event.target.value);
    console.log('data',this.summaryData);
    const val4 = event.target.value.toLowerCase();
    this.isFiltered4 = val4;

    const temp4 = this.summaryData.filter(function (d:any) {
      const eq_no4 = d.equipment_number ? d.equipment_number.toLowerCase() : '';
      const eq_name4 = d.equipment_name ? d.equipment_name.toLowerCase() : '';
      const dept4 = d.departement ? d.departement.toLowerCase() : '';
      const area4 = d.area ? d.area.toLowerCase() : '';
      const tgl_kal4 = d.tanggal_calibration ? d.tanggal_calibration.toLowerCase() : '';
      const plan_kal4 = d.plan_kalibrasi ? d.plan_kalibrasi.toLowerCase() : '';
      const status4 = d.status ? d.status.toLowerCase() : '';
    
      return (
        eq_no4.toLowerCase().indexOf(val4) !== -1 ||
        eq_name4.toLowerCase().indexOf(val4) !== -1 ||
        dept4.toLowerCase().indexOf(val4) !== -1 ||
        area4.toLowerCase().indexOf(val4) !== -1 ||
        tgl_kal4.toLowerCase().indexOf(val4) !== -1 ||
        plan_kal4.toLowerCase().indexOf(val4) !== -1 ||
        status4.toLowerCase().indexOf(val4) !== -1 ||
        !val4
      );
    });
    
    console.log(temp4.length);
    this.totalRecords4 = temp4.length
    this.filteredData4 = temp4;
    this.paginate4()

  }  

  // SEARCH REGISTRATION TABLE
  filterUpdate5(event:any) {
    console.log('search_regis',event.target.value);
    console.log('data_regis',this.registTableData);
    const val5 = event.target.value.toLowerCase();
    this.isFiltered5 = val5;
    // var no = 

    const temp5 = this.registTableData.filter(function (d:any) {
      // const no5 = d.nomor_urut ? d.nomor_urut : '';
      // const index5 = d.year ? `${d.year}.12`:''
      const eq_name5 = d.nama_alat ? d.nama_alat.toLowerCase() : '';
      const dept5 = d.dept ? d.dept.toLowerCase() : '';
      const status5 = d.status ? d.status.toLowerCase() : '';
      const pic5 = d.pic ? d.pic.toLowerCase() : '';
    
      return (
        // no5.indexOf(val5) !== -1 ||
        eq_name5.toLowerCase().indexOf(val5) !== -1 ||
        dept5.toLowerCase().indexOf(val5) !== -1 ||
        status5.toLowerCase().indexOf(val5) !== -1 ||
        pic5.toLowerCase().indexOf(val5) !== -1 ||
        !val5
      );
    });
    
    console.log(temp5.length);
    this.totalRecords5 = temp5.length
    this.filteredData5 = temp5;
    this.paginate5()

  }

  // ============================================= STATUS BUTTON =============================================

  getStatusButton(expCalibrationDate: string): string {
    const expDate = new Date(expCalibrationDate);
    const currentDate = new Date();
    const diffInDays = Math.ceil((expDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays < 0) {
      return 'btn-red';
    } else if (diffInDays <= 7) {
      return 'btn-orange';
    } else if (diffInDays <= 30) {
      return 'btn-yellow';
    } else {
      return 'btn-green';
    }
  }

  getButtonContent(expCalibrationDate: string): string {
    const expDate = new Date(expCalibrationDate);
    const currentDate = new Date();
    const diffInDays = Math.ceil((expDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
  
    if (diffInDays < 0) {
      return 'EXPIRED';
    } else if (diffInDays <= 7) {
      return 'DANGER';
    } else if (diffInDays <= 30) {
      return 'WARNING';
    } else {
      return 'VALID';
    }
  }

  getCalibrationResultClass(result: number): string {
    switch (result) {
        case 1: return 'text-good';
        case 2: return 'text-enough';
        case 3: return 'text-bad';
        default: return '';
    }
  }

  getIsactiveClass(result: number): string {
    switch (result) {
        case 1: return 'text-good';
        case 0: return 'text-bad';
        default: return '';
    }
  }

  getStatusSummary(status: string): string {
    if (status === 'OPEN') {
      return 'btn-open';
    } else if (status === 'CLOSED') {
      return 'btn-closed';
    } else {
      return '';
    }
  }

  getStatusRegis(status: string): string {
    if (status === 'OPEN') {
      return 'btn-open-regis';
    } else if (status === 'CLOSED') {
      return 'btn-closed-regis';
    } else if (status === 'FOLLOW UP'){
      return 'btn-folup-regis';
    } else if (status === 'REJECTED'){
      return 'btn-reject-regis';
    } else{
      return '';
    }
  }

  // ============================================= INLINE EDITING =============================================

  editingCell: string | null = null;

  enableEditing(item: any, column: string) {
    this.editingCell = item.equipment_number + column;
  }

  saveEditing(item: any, equipment_number: any, column: string, event: any) {
    const newValue = event.target.value;
    item[column] = newValue;
    this.editingCell = null;
    console.log('input1 plan_kalibrasi', event.target.value);

    this.restApiServices.editPlanKalibrasi({date: newValue, eq_no: equipment_number})
    .subscribe(data=>{
      console.log('edit_plan', newValue);
      this.editPlanData = data.data
      
    }, (error: any) => {
      console.error(error);
    });
      
  }
  

  // ============================================= DOWNLOAD TABLE =============================================

  download1(): void {
    if (this.filteredDateNow) {
      console.log('click');
      this.exportToExcel1(this.filteredDateNow, 'CALIBRATION ' + this.monthName);
    } else {
      console.log('click2');
      this.exportToExcel1(this.nowKalibrasiData, 'CALIBRATION ' + this.monthName);
    }
  }
  
  exportToExcel1(data: any[], fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile1(excelBuffer, fileName);
  }
  
  private saveAsExcelFile1(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  download2(): void {
    if (this.filteredDatePlan) {
      console.log('click');
      this.exportToExcel2(this.filteredDatePlan, 'CALIBRATION ' + this.nextMonthName);
    } else {
      console.log('click2');
      this.exportToExcel2(this.planKalibrasiData, 'CALIBRATION ' + this.nextMonthName);
    }
  }
  
  exportToExcel2(data: any[], fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile2(excelBuffer, fileName);
  }
  
  private saveAsExcelFile2(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  download3(): void {
    if (this.allEquipmentData) {
      console.log('click');
      this.exportToExcel3(this.allEquipmentData, 'ALL EQUIPMENT LIST');

    } else{
      console.log('click2');

    }
  }
  
  exportToExcel3(data: any[], fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile3(excelBuffer, fileName);
  }
  
  private saveAsExcelFile3(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  download4(): void {
    if (this.filteredDateNow) {
      console.log('click');
      this.exportToExcel1(this.filteredDateSum, 'CALIBRATION SUMMARY ' + this.monthSum);
    } else {
      console.log('click2');
      this.exportToExcel1(this.summaryData, 'CALIBRATION SUMMARY ' + this.monthSum);
    }
  }
  
  exportToExcel4(data: any[], fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile4(excelBuffer, fileName);
  }
  
  private saveAsExcelFile4(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  download5(): void {
    if (this.registTableData) {
      console.log('click');
      this.exportToExcel5(this.registTableData, 'REGISTRATION CALIBRATION');

    } else{
      console.log('click2');

    }
  }
  
  exportToExcel5(data: any[], fileName: string): void {
    const worksheet: WorkSheet = utils.json_to_sheet(data);
    const workbook: WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile5(excelBuffer, fileName);
  }
  
  private saveAsExcelFile5(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
    const a: HTMLAnchorElement = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    const url: string = window.URL.createObjectURL(data);
    a.href = url;
    a.download = fileName + '.xlsx';
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }


  // ============================================= FILTER AREA =============================================

  filterArea1(event:any){
    console.log('apa isinya?', event.sub_area);
    this.areaValue1 = event.sub_area;

    this.restApiServices.filterArea({area:this.areaValue1})
    .subscribe(data=>{
      this.filteredAreaData1 = data.data[0]
      console.log('filtered_data_area',this.filteredAreaData1);
      this.paginate3()
      this.totalRecords3 = this.filteredAreaData1.length

    }, (error: any) => {
      console.error(error);
    });
  
  }

  filterArea2(event:any){
    console.log('apa isinya?', event.sub_area);
    this.areaValue2 = event.sub_area;

    this.restApiServices.filterArea({area:this.areaValue2})
    .subscribe(data=>{
      this.filteredAreaData2 = data.data[1]
      console.log('filtered_data_area',this.filteredAreaData2);
      this.paginate4()
      this.totalRecords4 = this.filteredAreaData2.length

    }, (error: any) => {
      console.error(error);
    });
  
  }


  // ============================================= SERTIF BUTTON =============================================

  // getSertif(id_hit: any): void {
  //   if (id_hit = 1) {
  //     console.log('click');
  //     this.exportToExcel1(this.filteredDateSum, 'CALIBRATION SUMMARY ' + this.monthSum);
  //     this.monthName = (data.data[0][0].month);
  //   } else {
  //     console.log('click2');
  //     this.exportToExcel1(this.summaryData, 'CALIBRATION SUMMARY ' + this.monthSum);
  //   }
  // }

}