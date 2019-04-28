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
  month: Month = new Month();
  selectedDay: Day;

  constructor(private monthService: MonthService,
              private dayService: DayService,
              private modalService: NgbModal) {
    console.log("C | calendar.component")
  }

  ngOnInit() {
    console.log("onInit | calendar.component");
    this.fetchMonth();
  }

  divOnClick(content, day) {
    console.log(day);
    this.selectedDay = day;
    this.modalService.open(content);
  }

  private fetchMonth() {
    this.monthService.fetchMonth("april").subscribe(value => {
        this.month = value;
        this.dayService.fetchDaysByMonth(this.month.name).subscribe(daysData => {
          this.month.days = daysData;
        });
      },
      error => {
        console.warn("error during data fetching | " + error)
      });
  }
}
