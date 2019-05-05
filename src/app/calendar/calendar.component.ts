import {Component, OnInit} from '@angular/core';
import {MonthService} from "./month/month.service";
import {Month} from "./month/month.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Day} from "./day/day.model";
import {DayService} from "./day/day.service";
import {TaskService} from "../tasks/service/tasks.service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  month: Month = new Month();
  selectedDay: Day;
  hasTasksAvailable = true;

  constructor(private monthService: MonthService,
              private dayService: DayService,
              private taskService: TaskService,
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
    this.monthService.fetchMonth("april").subscribe(fetchedMonth => {
        this.month = fetchedMonth;

        this.dayService.fetchDaysByMonth(this.month.name).subscribe(daysData => {


          this.month.days = this.mockTasks(daysData);
        });
      },
      error => {
        console.warn("error during data fetching | " + error)
      });

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
