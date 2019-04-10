import {Component} from '@angular/core';
import {TokenStorageService} from "./auth/token-storage.service";
import {AuthService} from "./auth/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // AUTHENTICATION FIELDS
  private role: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService,
              public authService: AuthService/*private taskService: TaskService*/) {
  }

  isAuthenticated(): boolean {
    return this.tokenStorage.getToken() != null;
  }

  logOut2() {
    console.log("onClick!");
    this.tokenStorage.logOut();
  }

}







