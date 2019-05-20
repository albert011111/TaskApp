import {Month} from "../month/month.model";
import {Task} from "../../tasks/model/task.model";

export class Day {
  id: number;
  date: Date;
  dayOfWeek: string;
  month: Month;
  tasks: Array<Task> = [];
  holiday: boolean = false;

  isSunday(): boolean {
    if (this.dayOfWeek === undefined) {
      return false;
    }
    return this.dayOfWeek.toLocaleUpperCase() === "SUNDAY";
  }

  public testPrint(): string {
    return "To jest testowy print klasy"
  }
}
