import {Injectable} from '@angular/core';
import {Month} from "./month.model";
import {Day} from "../day/day.model";
import {WeekDay} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  month: Month;

  constructor() {
    console.log("C | month.service");
    this.month = {
      id: 1,
      name: 'April',
      days: []
    };

    this.setupDaysArray();
  }

  private setupDaysArray() {

    let day1: Day = {
      id: 1,
      date: new Date(2019, 4, 1),
      dayOfWeek: WeekDay.Monday.toString(),
      month: this.month,
      tasks: [],
      isHoliday: false
    };

    this.month.days.push(day1);

    let day2: Day = {
      id: 2,
      date: new Date(2019, 4, 2),
      dayOfWeek: WeekDay.Tuesday.toString(),
      month: this.month,
      tasks: [],
      isHoliday: false
    };

    this.month.days.push(day2);

    let day3: Day = {
      id: 3,
      date: new Date(2019, 4, 3),
      dayOfWeek: WeekDay.Wednesday.toString(),
      month: this.month,
      tasks: [],
      isHoliday: true
    };

    this.month.days.push(day3);

  }


}
