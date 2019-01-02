import {Injectable} from "@angular/core";
import {HTTP_INTERCEPTORS, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TokenStorageService} from "./token-storage.service";
import {provideForRootGuard} from "@angular/router/src/router_module";

const TOKEN_HEADER_KEY = 'Authorization';
const BEARER_PREFIX = 'Bearer ';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private tokenService: TokenStorageService) {
  }

  //HTTP INTERCEPTOR ---> przechwytywanie requestow HTTP!!!
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, BEARER_PREFIX + token)});
    }
    return next.handle(authReq);
  }
}

//to zamiast wstawiania tej tablicy w app.module w tablicy providers
export const httpInterceptorProviders = [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}];

