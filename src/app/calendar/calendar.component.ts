import {Component, OnInit} from '@angular/core';
import {MonthService} from "./month/month.service";
import {Month} from "./month/month.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Day} from "./day/day.model";
import {DayService} from "./day/day.service";
import {TaskService} from "../tasks/service/tasks.service";
import {formatDate} from "@angular/common";
import {Months} from "../shared/models/months.enum";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  month: Month = new Month();
  months: Array<string> = [];
  displayedMonth: string = '';
  selectedDay: Day;

  constructor(private monthService: MonthService,
              private dayService: DayService,
              private taskService: TaskService,
              private modalService: NgbModal) {
    console.log("C | calendar.component")
  }

  ngOnInit() {
    console.log("onInit | calendar.component");

    Object.keys(Months).filter(value => !value.match("^[0-9]{1,2}")).forEach(value => {
      this.months.push(value);
    });

    this.fetchMonth(this.retrieveMonthName(new Date()));
    this.displayedMonth = this.month.name;
  }

  public isFirstMonthSelected(): boolean {
    return this.displayedMonth === undefined
      ? false
      : this.displayedMonth.toLocaleUpperCase() === Months[0];
  }

  public isLastMonthSelected(): boolean {
    return this.displayedMonth === undefined
      ? false
      : this.displayedMonth.toLocaleUpperCase() === Months[11];
  }

  private prevMonth() {
    const previousMonth = Months[Months[this.displayedMonth] - 1];
    this.displayedMonth = previousMonth;

    this.fetchMonth(previousMonth);
  }

  private nextMonth() {
    const nextMonth = Months[Months[this.displayedMonth] + 1];
    this.displayedMonth = nextMonth;

    this.fetchMonth(nextMonth);
  }

  private fetchMonth(monthName: string) {
    this.monthService.fetchMonth(monthName).subscribe(fetchedMonth => {
        this.setupMonthSelections(fetchedMonth);

        this.dayService.fetchDaysByMonth(this.month.name).subscribe(daysData => {
          this.month.days = this.mockTasks(daysData);
        });
      },
      error => {
        console.warn("error during data fetching | " + error)
      });
  }

  private setupMonthSelections(fetchedMonth: Month) {
    this.month = fetchedMonth;
    this.displayedMonth = this.month.name.toLocaleUpperCase();
  }

  private retrieveMonthName(selectedDate: Date): string {
    return formatDate(selectedDate, "MMMM", "en");
  }

  private divOnClick(content, day) {
    console.log(day);
    this.selectedDay = day;
    this.modalService.open(content);
  }

  //TODO replace with http request
  private mockTasks(days: Array<Day>): Array<Day> {
    let daysWithTasks: Array<Day> = days;

    daysWithTasks.forEach(day => {
      this.taskService.getTasks().subscribe(fetchedTasks => {

        console.log(fetchedTasks.length);

        if (day.id % 2 === 0) {
          fetchedTasks.forEach(task => {
            day.tasks.push(task);
          })
        }
      });
    });

    return daysWithTasks;
  }
}
