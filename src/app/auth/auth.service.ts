import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthLoginInfo} from "./login-info";
import {Observable} from "rxjs/index";
import {JwtResponse} from "./jwt-response";
import {RegisterInfo} from "./register-info";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly LOGIN_PATH = "http://localhost:8080/api/auth/login";
  readonly REGISTER_PATH = "http://localhost:8080/api/auth/register";

  constructor(private http: HttpClient) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.LOGIN_PATH, credentials, httpOptions);
  }

  register(registerBody: RegisterInfo): Observable<string> {
    return this.http.post<string>(this.REGISTER_PATH, registerBody, httpOptions);
  }
}
