import {BillType} from "../../shared/models/bill-type.enum";

export class Bill {
  constructor(private type: BillType,
              private name?: string,
              private amount?: number,
              private price?: number,
              private note ?: string) {
  }

  public calcBillValue(): number {
    if (this.amount === null || this.price === null) {
      return 0;
    }
    return this.amount * this.price;
  }
}
