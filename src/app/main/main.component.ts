import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AccountDataService } from '../services/account_service/account-data.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  transactions: Object[] = [];
  ids: Object = {};
  htmlToAdd: SafeHtml;



  constructor(private AccountService: AccountDataService, private sanitizer: DomSanitizer) {
    this.AccountService.allTransactions.subscribe((trans: Object[]) => {
      this.transactions = trans;
      // console.log(this.transactions);
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker('./main.worker', { type: 'module' });
        worker.postMessage(trans);
        worker.onmessage = ({ data }) => {
          if(data.length) {
            this.AccountService.listIds(data);
          }
        };
      } else {
        // Web Workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      }
    })

    this.AccountService.allAssets.subscribe((trans: Object) => {
      this.ids = trans;
      // console.log(this.ids);
      if (typeof Worker !== 'undefined') {
        // Create a new
        const worker = new Worker('./html-trans.worker', { type: 'module' });
        if(this.transactions.length > 0 && this.ids){
          worker.postMessage({transactions: this.transactions, assets: this.ids});

          worker.onmessage = ({ data }) => {
            // this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(data);
            $('#goal').html(data);
          };
        }
      } else {
        // Web Workers are not supported in this environment.
        // You should add a fallback so that your program still executes correctly.
      }
    })

    // electron.ipcRenderer.on('add:add', (event, arg) => {
    //   console.log('Received acknowledged from backend about receipt of our signal.');
    //   // console.log(event);
    //   console.log(arg);
    // });

  }

  getDataByAddress(address: HTMLInputElement){
  //   $('#goal').append(`<div class="loader"><div class="sticks">
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //     <div class="stick"></div>
  //   </div>
  //   <svg>
  //     <circle cx='50%' cy='50%' r='150'></circle>
  //   </svg>
  // </div></div>`);

    this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(`
    <div class='loader'>
      <div class="sticks">
        <div class="stick"></div>
        <div class="stick"></div>
        <div class="stick"></div>
        <div class="stick"></div>
        <div class="stick"></div>
        <div class="stick"></div>
        <div class="stick"></div>
        <div class="stick"></div>
      </div>
      <svg>
        <circle cx='50%' cy='50%' r='150'></circle>
      </svg>
  </div>`);
    this.AccountService.rawData(address.value);
  }

  ngOnInit() {
    this.AccountService.getSpam();
  }

}
