import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private commonUrl = 'http://localhost:8080/api/test/all';

  constructor(private http: HttpClient) {
  }

  getUserContent(): Observable<object> {
    return this.http.get(this.userUrl, {responseType: 'json'});
  }

  getAdminContent(): Observable<string> {
    return this.http.get(this.adminUrl, {responseType: 'text'});
  }

  getCommonContent(): Observable<string> {
    return this.http.get(this.commonUrl, {responseType: 'text'});
  }


}
