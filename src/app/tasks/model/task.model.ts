export class Task {
  id?: number;
  name: string;
  createDate: Date;
  executeDate?: Date;
  description?: string;
  dayId?: number;
  userName: string;

  constructor() {
    this.name = '';
    this.createDate = null;
    this.executeDate = null;
    this.description = '';
    this.dayId = null;
    this.userName = '';
  }
}
