import {Component, OnInit} from '@angular/core';
import {WalletService} from './service/wallet.service';
import {Day} from '../calendar/day/day.model';
import {DayService} from '../calendar/day/day.service';
import {TaskService} from '../tasks/service/tasks.service';
import {Task} from '../tasks/model/task.model';
import {Bill} from './bill/bill.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';

const PRICE: string = 'price';
const AMOUNT: string = 'amount';
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

  constructor(private formBuilder: FormBuilder,
              private walletService: WalletService,
              private dayService: DayService,
              private taskService: TaskService) {
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

  private initExtraBillsFormArray(): void {
    let bills: FormGroup[] = [];

    this.walletService.fetchExtraBills$().subscribe(extraBills => {
      extraBills.forEach(extraBill => {
        let extraBillGroup = this.mapExtraBillToFormGroup(extraBill);

        bills.push(extraBillGroup);
      });
      this.setupExtraBillsFormArray(bills);
    });
  }

  private mapExtraBillToFormGroup(extraBill: Bill) {
    return this.formBuilder.group({
      billName: extraBill.name,
      amount: extraBill.amount,
      price: extraBill.price,
      value: extraBill.calcBillValue(),
      notes: extraBill.note
    });
  }

  private setupExtraBillsFormArray(bills: FormGroup[]) {
    this.extraBillsForm = this.formBuilder.group({
      extraBills: this.formBuilder.array(bills)
    });
  }

  private buildExtraBill(): FormGroup {
    return this.formBuilder.group({
      billName: '',
      amount: null,
      price: null,
      value: null,
      notes: ''
    });
  }

  public getExtraBillsFormArray(): FormArray {
    return <FormArray>this.extraBillsForm.get(EXTRA_BILLS);
  }

  public getExtraBillsFormByIdx(idx: number): FormGroup {
    return <FormGroup>this.getExtraBillsFormArray().at(idx);
  }

  public extraBillFormOnEdit(idx: number): void {
    const extraBillsFormGroup = this.getExtraBillsFormByIdx(idx);
    if (extraBillsFormGroup.disabled) {
      extraBillsFormGroup.enable();
    } else {
      extraBillsFormGroup.disable();
    }
  }

  public countTotalExtraBillsValue(): number {
    let totalValue: number = 0;
    let formGroup: FormArray = this.getExtraBillsFormArray();

    formGroup.controls.forEach(formGroup => {
      totalValue += formGroup.get(PRICE).value;
    });

    return totalValue;
  }

  public calcBillValueByIdx(idx: number): number {
    let extraBillFormGroup = this.getExtraBillsFormByIdx(idx);
    let amount = extraBillFormGroup.get(AMOUNT).value;
    let price = extraBillFormGroup.get(PRICE).value;

    return amount === 0 || price === 0 ? 0 : amount * price;
  }

  public addNewExtraBill(): void {
    let controls = <FormArray>this.extraBillsForm.controls.extraBills;
    controls.push(this.buildExtraBill());
  }

  public removeExtraBill(extraBillName: number): void {
    console.log(extraBillName);
    this.getExtraBillsFormArray().removeAt(extraBillName);
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
