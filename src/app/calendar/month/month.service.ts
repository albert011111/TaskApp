import {Injectable} from '@angular/core';
import {Month} from "./month.model";
import {DayService} from "../day/day.service";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class MonthService {
  private month: Month;

  private basePath = 'http://localhost:8080/api/months';

  constructor(private dayService: DayService, private http: HttpClient) {
    console.log("C | month.service");

    /*    dayService.fetchDays(this.month).subscribe(value => {
          this.month.days = value;
        });*/
  }

  fetchMonth(monthName: string): Observable<Month> {
    return this.http.get<Month>(this.basePath + "/" + monthName)
  }
}
