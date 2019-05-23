import {Injectable} from '@angular/core';
import {BillType} from "../../shared/models/bill-type.enum";

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor() {
  }

  public getBillType(): BillType[] {
    return Object
      .keys(BillType)
      .filter(value => isNaN(Number(value)) === false)
      .map(value => BillType[value.toString()])
  }

}
