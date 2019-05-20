import {Injectable} from '@angular/core';
import {Day} from "../../calendar/day/day.model";
import {BehaviorSubject} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class CommonDateService {
  selectedDate: Date;
  private sharedDay = new BehaviorSubject<Day>(null);
  $selectedDay = this.sharedDay.asObservable();

  constructor() {
  }

  public resetDay(): void {
    this.selectedDate = new Date();
  }

  public setupSelectedDay(selectedDay: Day): void {
    this.sharedDay.next(selectedDay);
  }
}
