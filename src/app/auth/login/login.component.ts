import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthLoginInfo} from "../login-info";
import {TokenStorageService} from "../token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly MIN_PASSWORD_LENGTH = 6;
  private loginInfo: AuthLoginInfo;
  private isLogged: boolean = true;
  private loginForm: FormGroup;

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userLogin: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.minLength(this.MIN_PASSWORD_LENGTH))
    });

    if (this.tokenStorage.getToken() != null) {
      this.isLogged = true;
    }
  }

  onLoginSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.loginForm.get("userLogin").value,
      this.loginForm.get("userPassword").value);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      jwtResponse => {
        console.log("logged succesfully! :)");
        console.log(jwtResponse.token);
        console.log(jwtResponse.username);
        console.log(jwtResponse.authorities);

        this.tokenStorage.saveToken(jwtResponse.token);
        this.tokenStorage.saveUsername(jwtResponse.username);
        this.tokenStorage.saveAuthorities(jwtResponse.authorities);

        this.router.navigate(['tasks-list']);
        this.isLogged = true;
      },
      error => {
        console.log("Failed to login: " + error.toString());
        this.isLogged = false;
        this.loginForm.reset();
      });
  }
}
