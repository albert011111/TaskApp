import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class User {
  constructor(public id?: number, public username?: string) {
  }
}
