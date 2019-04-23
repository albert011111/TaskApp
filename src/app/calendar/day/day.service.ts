import {Injectable} from '@angular/core';
import {WeekDay} from "@angular/common";
import {Day} from "./day.model";
import {Observable, of} from "rxjs/index";
import {Month} from "../month/month.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DayService {
  days: Array<Day>;
  month: Month;
  private daysPath = 'http://localhost:8080/api/days';

  constructor(private http: HttpClient) {
    this.fetchDays(this.month).subscribe(days => {
      this.days = days;
    });
  }


  fetchDays(month: Month): Observable<Day[]> {

    let day1: Day = {
      id: 1,
      date: new Date(2019, 4, 1),
      dayOfWeek: WeekDay.Monday.toString(),
      month: month,
      tasks: [],
      isHoliday: false
    };

    let day2: Day = {
      id: 2,
      date: new Date(2019, 4, 2),
      dayOfWeek: WeekDay.Tuesday.toString(),
      month: month,
      tasks: [],
      isHoliday: false
    };

    let day3: Day = {
      id: 3,
      date: new Date(2019, 4, 3),
      dayOfWeek: WeekDay.Wednesday.toString(),
      month: month,
      tasks: [],
      isHoliday: true
    };

    let day4: Day = {
      id: 4,
      date: new Date(2019, 4, 3),
      dayOfWeek: WeekDay.Thursday.toString(),
      month: month,
      tasks: [],
      isHoliday: true
    };

    let day5: Day = {
      id: 3,
      date: new Date(2019, 4, 3),
      dayOfWeek: WeekDay.Friday.toString(),
      month: month,
      tasks: [],
      isHoliday: true
    };

    let day6: Day = {
      id: 3,
      date: new Date(2019, 4, 3),
      dayOfWeek: WeekDay.Saturday.toString(),
      month: month,
      tasks: [],
      isHoliday: true
    };

    let day7: Day = {
      id: 6,
      date: new Date(2019, 4, 3),
      dayOfWeek: WeekDay.Sunday.toString(),
      month: month,
      tasks: [],
      isHoliday: true
    };

    return of(Array.of(day1, day2, day3, day4, day5, day6, day7));
  }

  getDayById(dayId: number): Day {
    console.log("searching day with ID: " + dayId);
    console.log("days array: " + this.days.length);

    if (this.days != null) {
      return this.days.find(day => dayId === day.id);
    }
  }

  fetchDaysByMonth(monthName: string): Array<Day> {

    this.http.get<Array<Day>>(this.daysPath + "/" + monthName).subscribe(data => {
      this.days = data;
    });
    return this.days;
  }

}
