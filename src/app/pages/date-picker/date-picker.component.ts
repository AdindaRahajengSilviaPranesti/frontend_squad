import { Component } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {



  DateSelected : any; 

  
  fetchDateSelected(){
    console.log("date selected by user is ---" + this.DateSelected);
  }
}
