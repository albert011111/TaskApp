import {Injectable} from '@angular/core';
import {Month} from "./month.model";
import {WeekDay} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  month: Month;

  constructor() {
    console.log("C | month.service");
    this.month = {
      id: 100,
      name: WeekDay[WeekDay.Monday],
      days: []
    };

    this.setupDaysArray();
  }

  private setupDaysArray() {
    for (let i = 1; i < 31; i++) {
      this.month.days.push(i);
    }
  }
}
