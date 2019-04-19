import {Component, OnInit} from '@angular/core';
import {MonthService} from "./month/month.service";
import {Month} from "./month/month.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  month: Month;

  constructor(private monthService: MonthService, private modalService: NgbModal) {
    console.log("C | calendar.component")
  }

  ngOnInit() {
    console.log("onInit | calendar.component");

    this.month = this.monthService.month;
  }

  divOnClick(event) {
    this.modalService.open(event);
  }

  divOnHover(event) {
    console.log("hovered");
    console.log(event.target.innerHTML);
  }
}
