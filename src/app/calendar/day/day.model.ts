import {Month} from "../month/month.model";
import {Task} from "../../tasks/model/task.model";

export class Day {
  id: number;
  date: Date;
  dayOfWeek: string;
  month: Month;
  tasks: Array<Task> = [];
  holiday: boolean = false;
}
