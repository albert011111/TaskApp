import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {RegisterInfo} from "../register-info";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  private registerBody: RegisterInfo;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl(null),
      username: new FormControl(null),
      email: new FormControl(null, Validators.email),
      password: new FormControl(null),
    })
  }

  onRegisterSubmit() {
    this.registerBody = new RegisterInfo(
      this.registerForm.get("name").value,
      this.registerForm.get("username").value,
      this.registerForm.get("email").value,
      this.registerForm.get("password").value
    );
    console.log(this.registerBody);

    this.authService.register(this.registerBody).subscribe(data => {
      console.log(data);
    });
    this.registerForm.reset();
  }

  public clearForm() {
    this.registerForm.reset();
  }

}
