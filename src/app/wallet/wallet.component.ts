import {Component, ElementRef, OnInit} from '@angular/core';
import {WalletService} from './service/wallet.service';
import {Day} from '../calendar/day/day.model';
import {DayService} from '../calendar/day/day.service';
import {TaskService} from '../tasks/service/tasks.service';
import {Task} from '../tasks/model/task.model';
import {Bill} from './bill/bill.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

const EXTRA_BILLS: string = 'extraBills';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public bills: Bill[] = [];
  public minValue: number = 0;
  public totalStandardBillsValue: number = 0;

  public extraBillsForm: FormGroup;
  public togglerDescription: string = 'Edytuj';
  private isEditing = false;

  constructor(private formBuilder: FormBuilder,
              private walletService: WalletService,
              private dayService: DayService,
              private taskService: TaskService,
              private elRef: ElementRef) {
  }

  ngOnInit(): void {
    this.initBillsTable();
    this.initExtraBillsFormArray();
  }

  private initBillsTable() {
    this.walletService.fetchBills$().subscribe(bills => {
      bills.forEach(bill => {
        this.bills.push(bill);
        this.totalStandardBillsValue += bill.calcBillValue();
      });
    });
  }

  private initExtraBillsFormArray() {
    this.extraBillsForm = this.formBuilder.group({
      // extraBills: this.formBuilder.array([this.buildExtraBill(), this.buildExtraBill(), this.buildExtraBill()])
      extraBills: this.formBuilder.array([this.buildExtraBill(), this.buildExtraBill()])
    });
  }

  private buildExtraBill(): FormGroup {
    return this.formBuilder.group({
      billName: 'exampleName',
      amount: 100,
      price: 333,
      value: 777,
      notes: 'notes'
    });
  }

  public getFormArrayElements(): FormArray {
    return <FormArray>this.extraBillsForm.get(EXTRA_BILLS);
  }

  public editExtraBill(btnId: string): void {
    this.toggleBtnDescription();
  }

  private toggleBtnDescription() {
    this.isEditing = !this.isEditing;
    this.togglerDescription = this.isEditing
      ? 'Zapisz'
      : 'Edytuj';
  }

  public addNewExtraBill(): void {
    let controls = <FormArray>this.extraBillsForm.controls.extraBills;
    controls.push(this.buildExtraBill());
  }

  public removeExtraBill(extraBillName: number): void {
    console.log(extraBillName);
    this.getFormArrayElements().removeAt(extraBillName);
  }


  public getFormClass(): string {
    return 'form-control form-control-sm shadow-sm';
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
