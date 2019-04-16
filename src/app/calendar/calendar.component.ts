import {Component, OnInit} from '@angular/core';
import {MonthService} from "./month/month.service";
import {Month} from "./month/month.model";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  month: Month;

  constructor(public monthService: MonthService) {
    console.log("C | calendar.component")
  }

  ngOnInit() {
    console.log("onInit | calendar.component");

    this.month = this.monthService.month;
  }

}
