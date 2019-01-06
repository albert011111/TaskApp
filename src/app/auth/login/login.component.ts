import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {AuthLoginInfo} from "../login-info";
import {TokenStorageService} from "../token-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  readonly MIN_PASSWORD_LENGTH = 4;
  loginForm: FormGroup;
  private loginInfo: AuthLoginInfo;

  constructor(private loginService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      userLogin: new FormControl(null, Validators.required),
      userPassword: new FormControl(null, Validators.minLength(this.MIN_PASSWORD_LENGTH))
    });
  }

  onLoginSubmit() {
    this.loginInfo = new AuthLoginInfo(
      this.loginForm.get("userLogin").value,
      this.loginForm.get("userPassword").value);

    this.loginService.attemptAuth(this.loginInfo).subscribe(jwtResponse => {
      console.log("logged succesfully! :)");


      console.log(jwtResponse.token);
      console.log(jwtResponse.username);
      console.log(jwtResponse.authorities);
      this.tokenStorage.saveToken(jwtResponse.token);
      this.tokenStorage.saveUsername(jwtResponse.username);

      this.tokenStorage.saveAuthorities(jwtResponse.authorities);
    });

    /*    console.log("test");
        console.log(this.loginForm);*/
  }
}
