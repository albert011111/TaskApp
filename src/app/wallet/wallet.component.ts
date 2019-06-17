import {Component, OnInit} from '@angular/core';
import {WalletService} from "./service/wallet.service";
import {Day} from "../calendar/day/day.model";
import {DayService} from "../calendar/day/day.service";
import {TaskService} from "../tasks/service/tasks.service";
import {Task} from "../tasks/model/task.model";
import {Bill} from "./bill/bill.model";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public bills: Bill[] = [];
  public minValue: number = 0;
  public totalStandardBillsValue: number = 0;

  extraBillsForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private walletService: WalletService,
              private dayService: DayService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.initExtraBillsFormArray();


    // this.setupBillTypes();
    this.walletService.fetchBills$().subscribe(bills => {
      bills.forEach(bill => {
        this.bills.push(bill);
        this.totalStandardBillsValue += bill.calcBillValue();
      });
    });
  }

  public getFormClass(): string {
    return "form-control form-control-sm shadow-sm"
  }

  private initExtraBillsFormArray() {
    this.extraBillsForm = this.formBuilder.group({
      extraBills: this.formBuilder.array([this.buildExtraBill(), this.buildExtraBill(), this.buildExtraBill()])
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

  private buildExtraBill(): FormGroup {
    return this.formBuilder.group({
      billName: 'billName',
      amount: 100,
      price: 333,
      value: 777,
      notes: 'notes'
    });
  }

  public setupPointer(): string {
    return "{"
  }
}
