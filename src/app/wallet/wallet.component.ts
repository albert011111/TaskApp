import {Component, OnInit} from '@angular/core';
import {WalletService} from "./service/wallet.service";
import {BillType} from "../shared/models/bill-type.enum";

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public billTypes: BillType[] = [];

  constructor(private walletService: WalletService) {
  }

  ngOnInit() {
    this.billTypes = this.fetchBills();
    console.log(this.billTypes.length)
  }

  public fetchBills(): BillType[] {
    this.walletService.getBillType().forEach(value => console.log(value));
    return this.walletService.getBillType();
  }

}
