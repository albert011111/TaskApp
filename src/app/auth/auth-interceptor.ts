import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";

const TOKEN_HEADER_KEY = 'Authorization';
const BEARER_PREFIX = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private tokenService: TokenStorageService) {
  }

  //HTTP INTERCEPTOR ---> przechwytywanie requestow HTTP!!!
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler) {
    let requestWithToken = httpRequest;
    const token = this.tokenService.getToken();
    if (token != null) {
      requestWithToken = httpRequest.clone({
        headers: httpRequest.headers.set(TOKEN_HEADER_KEY, BEARER_PREFIX + token)
      });
    }
    return next.handle(requestWithToken);
  }
}

//to zamiast wstawiania tej tablicy w app.module w tablicy providers
export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];

