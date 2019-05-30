import {Component, OnInit} from '@angular/core';
import {WalletService} from "./service/wallet.service";
import {BillType} from "../shared/models/bill-type.enum";
import {Day} from "../calendar/day/day.model";
import {DayService} from "../calendar/day/day.service";
import {TaskService} from "../tasks/service/tasks.service";
import {Task} from "../tasks/model/task.model";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public billTypes: BillType[] = [];

  constructor(private walletService: WalletService, private dayService: DayService, private taskService: TaskService) {
  }

  ngOnInit() {
    this.billTypes = this.fetchBills();
    console.log(this.billTypes.length)
  }

  public fetchBills(): BillType[] {
    this.walletService.getBillType().forEach(value => console.log(value));
    return this.walletService.getBillType();
  }

  public getRequest() {
    let testDay: Day = new Day();
    console.log(testDay);
    console.log('before fetch' + testDay);
    this.dayService.getDayById(52).subscribe(value => {
      testDay = value;
      console.log(typeof value);

      value.testPrint();
    });
  }

  public postRequest() {
    // let task: Task = new Task();
    this.taskService.addTask(new Task()).subscribe();
  }

}
