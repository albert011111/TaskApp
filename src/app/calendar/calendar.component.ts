import {Component, OnDestroy, OnInit} from '@angular/core';
import {MonthService} from "./month/month.service";
import {Month} from "./month/month.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Day} from "./day/day.model";
import {DayService} from "./day/day.service";
import {TaskService} from "../tasks/service/tasks.service";
import {formatDate} from "@angular/common";
import {Months} from "../shared/models/months.enum";
import {CommonDateService} from "../shared/services/common-date.service";
import {TokenStorageService} from "../auth/token-storage.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy {
  month: Month = new Month();
  months: Array<string> = [];
  displayedMonth: string = '';
  selectedDay: Day;
  isCollapsed: boolean = true;

  testDay: Day;

  constructor(private monthService: MonthService,
              private dayService: DayService,
              private taskService: TaskService,
              private tokenService: TokenStorageService,
              private commonDateService: CommonDateService,
              private modalService: NgbModal) {
    console.log("C | calendar.component");
    this.testDay = new Day();
  }

  ngOnInit() {
    console.log("onInit | calendar.component");

    Object.keys(Months)
      .filter(value => !value.match("^[0-9]{1,2}"))
      .forEach(value => {
        this.months.push(value);
      });

    this.fetchMonth(this.retrieveMonthName(new Date()));
    this.displayedMonth = this.month.name;
  }

  ngOnDestroy(): void {
    this.isCollapsed = true;
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

  public prevMonth() {
    const previousMonth = Months[Months[this.displayedMonth] - 1];
    this.displayedMonth = previousMonth;

    this.fetchMonth(previousMonth);
  }

  public nextMonth() {
    const nextMonth = Months[Months[this.displayedMonth] + 1];
    this.displayedMonth = nextMonth;

    this.fetchMonth(nextMonth);
  }

  onAddNewTask(event, selectedDay: Day) {
    this.commonDateService.selectedDate = selectedDay.date;
    this.commonDateService.setupSelectedDay(selectedDay);
    alert(this.commonDateService.selectedDate);
  }

  public filterTasksByUser(): void {
    let currentUser = this.tokenService.getUsername();

    this.month.days.forEach(day => {
      day.tasks = day.tasks.filter(task => task.user.username !== null && task.user.username === currentUser);
    })
  }

  private setupMonthSelections(fetchedMonth: Month) {
    this.month = fetchedMonth;
    this.displayedMonth = this.month.name.toLocaleUpperCase();
  }

  private retrieveMonthName(selectedDate: Date): string {
    return formatDate(selectedDate, "MMMM", "en");
  }

  private fetchMonth(monthName: string) {
    this.monthService.fetchMonth(monthName).subscribe(fetchedMonth => {
        console.warn(window.sessionStorage.getItem("AuthUsername"));
        this.setupMonthSelections(fetchedMonth);
        this.filterTasksByUser();
      },
      error => {
        console.warn("error during data fetching | " + error)
      });
  }

  viewTaskList() {
    this.isCollapsed = !this.isCollapsed;
  }

  private dayDivOnClick(detailWindow, day: Day) {
    console.log(day);
    this.selectedDay = day;
    this.modalService.open(detailWindow);
  }
}
