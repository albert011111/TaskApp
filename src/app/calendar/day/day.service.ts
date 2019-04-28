import {Injectable} from '@angular/core';
import {Day} from "./day.model";
import {Observable} from "rxjs/index";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DayService {
  private daysPath = 'http://localhost:8080/api/days';
  constructor(private http: HttpClient) {
  }

  fetchDaysByMonth(monthName: string): Observable<Array<Day>> {
    return this.http.get<Array<Day>>(this.daysPath + "/" + monthName);
  }

}
