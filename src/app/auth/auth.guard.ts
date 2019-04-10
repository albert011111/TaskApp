import {CanActivate, Router} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {TokenStorageService} from "./token-storage.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  canActivate(): boolean {
    console.log("AuthGuard: check --> " + this.tokenStorage.getToken() != null);

    if (this.tokenStorage.getToken() != null) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
