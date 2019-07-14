import {Injectable} from '@angular/core';
import {BillType} from '../../shared/models/bill-type.enum';
import {Observable, of} from 'rxjs/index';
import {Bill} from '../bill/bill.model';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  public bills$: Observable<Bill[]> = new Observable<Bill[]>();
  public extraBills$: Observable<Bill[]> = new Observable<Bill[]>();

  private bills: Bill[] = [];
  private extraBills: Bill[] = [];

  constructor() {
    this.setupBills();
  }

  private setupBills() {
    this.bills.push(new Bill(BillType.ELECTRICITY, BillType[BillType.ELECTRICITY], 100, 1.25, 'Cena jednostkowa'));
    this.bills.push(new Bill(BillType.FOOD, BillType[BillType.FOOD], 1, 400, 'Cena za miesiac'));
    this.bills.push(new Bill(BillType.FUEL, BillType[BillType.FUEL], 1, 350, 'Cena za miesiac'));
    this.bills.push(new Bill(BillType.WATER, BillType[BillType.WATER], 1, 122, 'Cena za miesiac'));
    this.bills.push(new Bill(BillType.RENTAL, BillType[BillType.RENTAL], 1, 600, 'Cena za miesiac'));

    this.extraBills.push(new Bill(BillType.EXTRA, 'Prezent', 1, 150, 'Testowy prezent'));
    this.extraBills.push(new Bill(BillType.EXTRA, 'Piłka', 2, 55, 'Nowy sezon'));
  }

  public fetchBills$(): Observable<Bill[]> {
    return of(this.bills);
  }

  public fetchExtraBills$(): Observable<Bill[]> {
    return of(this.extraBills);
  }

}
