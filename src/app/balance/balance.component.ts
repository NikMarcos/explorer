import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  @Input() showBal: boolean;
  @ViewChild("assetName", {static: false}) assetName: ElementRef<any>;
  @Input() balances: Object[];
  @Output() closeBal: EventEmitter<boolean> = new EventEmitter();


  constructor() {}

  closeBalance(){
    this.showBal = true;
    this.closeBal.emit(this.showBal);
    this.assetName.nativeElement.value = ''
  }

  ngOnInit() {
  }

}
