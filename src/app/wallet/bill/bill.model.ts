import {BillType} from "../../shared/models/bill-type.enum";

export class Bill {
  constructor(public type: BillType,
              public name?: string,
              public amount?: number,
              public price?: number,
              public note ?: string) {
  }

  public calcBillValue(): number {
    if (this.amount === null || this.price === null) {
      return 0;
    }
    return this.amount * this.price;
  }
}
