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

  public testPrint(): void {
    let tempArray: Array<number> = [1, 2, 5, 6];

    return console.warn(tempArray.filter(value => value > 2));
  }
}
