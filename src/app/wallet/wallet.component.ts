import {Component, OnInit} from '@angular/core';
import {WalletService} from "./service/wallet.service";
import {Day} from "../calendar/day/day.model";
import {DayService} from "../calendar/day/day.service";
import {TaskService} from "../tasks/service/tasks.service";
import {Task} from "../tasks/model/task.model";
import {Bill} from "./bill/bill.model";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public bills: Bill[] = [];
  public totalStandardBillsValue: number = 0;
  constructor(private walletService: WalletService,
              private dayService: DayService,
              private taskService: TaskService) {
  }

  ngOnInit() {
    // this.setupBillTypes();
    this.walletService.fetchBills$().subscribe(bills => {
      bills.forEach(bill => {
        this.bills.push(bill);
        this.totalStandardBillsValue += bill.calcBillValue();
      });
    });
  }

  /*  public setupBillTypes(): void {
      let billTypes = Object.keys(BillType);
      this.billTypes = billTypes.slice(0,billTypes.length);
    }*/

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

  public setupPointer(): string {
    return "{"
  }
}
