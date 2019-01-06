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

  private loginUrl = "http://localhost:8080/api/auth/login";
  private registerUrl = "http://localhost:8080/api/auth/register";

  constructor(private http: HttpClient) {
  }


  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  register(registerBody: RegisterInfo): Observable<string> {
    return this.http.post<string>(this.registerUrl, registerBody, httpOptions);
  }

}
