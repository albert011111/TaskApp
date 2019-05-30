import {User} from "../../shared/models/user.model";

export class Task {
  id?: number;
  name: string;
  createDate: Date;
  executeDate?: Date;
  description?: string;
  dayId?: number;
  userName: string;
  userId: number;
  user: User;
  isFinished: boolean;

  constructor() {
    this.name = '';
    this.createDate = null;
    this.executeDate = null;
    this.description = '';
    this.dayId = null;
    this.userId = null;
    this.userName = '';
    this.isFinished = false;
  }
}
