import {Component, OnInit} from '@angular/core';
import {MonthService} from "./month/month.service";
import {Month} from "./month/month.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Day} from "./day/day.model";
import {DayService} from "./day/day.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  month: Month;
  selectedDay: Day;

  constructor(private monthService: MonthService,
              private dayService: DayService,
              private modalService: NgbModal) {
    console.log("C | calendar.component")
  }

  ngOnInit() {
    console.log("onInit | calendar.component");

    this.monthService.fetchMonth("april");
    this.month = this.monthService.month;
    this.dayService.fetchDaysByMonth("april");
    this.month.days = this.dayService.days;
  }

  divOnClick(content, dayId) {
    console.log(dayId);
    this.selectedDay = this.dayService.getDayById(dayId);
    console.log(this.selectedDay);
    this.modalService.open(content);
  }

  divOnHover(event) {
    console.log("hovered");
    console.log(event.target.innerHTML);
  }
}
