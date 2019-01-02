import {Component} from '@angular/core';
import {TaskService} from './tasks/service/tasks.service';
import {TokenStorageService} from "./auth/token-storage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  // AUTHENTICATION FIELDS
  private role: string[];
  private authority: string;

  constructor(private tokenStorage: TokenStorageService/*private taskService: TaskService*/) {
  }

}







