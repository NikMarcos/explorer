import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone, Pipe, PipeTransform  } from '@angular/core';
import { AccountDataService } from '../services/account_service/account-data.service';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import * as $ from 'jquery';
// const { ipcRenderer, remote } = (<any>window).require('electron');




@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit {
  // ipc: IpcRenderer = (<any>window).require('electron').ipcRenderer;
  @ViewChild("filter", {static: false}) filterTab: ElementRef;
  @ViewChild("checkBtn", {static: false}) checkBtn: ElementRef;
  @ViewChild("searchDataInp", {static: false}) searchDataInp: ElementRef;
  transactions: Object[] = [];
  ids: Object = {};
  htmlToAdd: SafeHtml;
  allTxs: string;
  allTxsTest: Object[] = [];
  balanceBtn: Object[];
  balances: Object[];
  showBalance: boolean = true;

  type1: string;
  typeDeposit: string;
  typeSend: string;
  type7: string;
  type8: string;
  type9: string;
  typeMassSend: string;
  typeMassReceive: string;
  type3: string;
  type5: string;
  type6: string;
  type10: string;
  type12: string;
  type13: string;
  type14: string;
  type15: string;
  type16: string;
  typeElse: string;

  countAllTxs: number;
  countType1: number;
  countTypeDeposit: number;
  countTypeSend: number;
  countType7: number;
  countType8: number;
  countType9: number;
  countTypeMassSend: number;
  countTypeMassReceive: number;
  countType3: number;
  countType5: number;
  countType6: number;
  countType10: number;
  countType12: number;
  countType13: number;
  countType14: number;
  countType15: number;
  countType16: number;
  countTypeElse: number;
  current = 'all';
  // BrowserWindow: any = window.require('electron').BrowserWindow;



  constructor(private AccountService: AccountDataService, private sanitizer: DomSanitizer, private zone: NgZone) {

    this.AccountService.allTransactions.subscribe((trans: Object[]) => {
      this.transactions = trans;
      this.countAllTxs = this.transactions.length > 0 ? this.transactions.length - 1 : 0;

      if (typeof Worker !== 'undefined') {
        const worker = new Worker('./main.worker', { type: 'module' });
        worker.postMessage(trans);
        worker.onmessage = ({ data }) => {
          if(data.length) {
            this.AccountService.listIds(data);
          }
        };
      }
    })
    this.AccountService.balances.subscribe((data: Object[]) => {
      this.zone.run(() => {
        this.balances = data;
      });
    });


    this.AccountService.allAssets.subscribe((trans: Object) => {
      this.ids = trans;
      if (typeof Worker !== 'undefined') {
        const worker = new Worker('./html-trans.worker', { type: 'module' });
        if(this.transactions.length > 0 && this.ids){
          worker.postMessage({transactions: this.transactions, assets: this.ids});

          worker.onmessage = ({ data }) => {
            // this.allTxs = data;
            this.allTxsTest = data[0];
            this.current = 'all';
            let counts = data[1];
            this.zone.run(() => {
            this.countType1 = counts['countType1'];
            this.countTypeDeposit = counts['countTypeDeposit'];
            this.countTypeSend = counts['countTypeSend'];
            this.countType7 = counts['countType7'];
            this.countType8 = counts['countType8'];
            this.countType9 = counts['countType9'];
            this.countTypeMassSend = counts['countTypeMassSend'];
            this.countTypeMassReceive = counts['countTypeMassReceive'];
            this.countType3 = counts['countType3'];
            this.countType5 = counts['countType5'];
            this.countType6 = counts['countType6'];
            this.countType10 = counts['countType10'];
            this.countType12 = counts['countType12'];
            this.countType13 = counts['countType13'];
            this.countType14 = counts['countType14'];
            this.countType15 = counts['countType15'];
            this.countType16 = counts['countType16'];
            this.countTypeElse = counts['countTypeElse'];
            });

            this.checkBtn.nativeElement.disabled = false;


            this.AccountService.balance(this.transactions[0]);




            // if (typeof Worker !== 'undefined') {
            //   const sepWorker = new Worker('./separate-txs.worker', { type: 'module' });
            //   if(this.allTxs){
            //     sepWorker.postMessage({transactions: this.transactions, assets: this.ids});
            //     sepWorker.onmessage = ({ data }) => { };
            //   }
            // }
          };
        }
      }
    })

    // electron.ipcRenderer.on('add:add', (event, arg) => {
    //   console.log('Received acknowledged from backend about receipt of our signal.');
    //   // console.log(event);
    //   console.log(arg);
    // });

  }

  // changeBalance(){
  //   this.showBalance = true;
  // }

  test(balance: HTMLInputElement){
    let elementId = balance.id;
    switch (elementId) {
      case 'all':
        this.current = 'all';
        break;
      case 'deposit':
        this.current = 'deposit';
        break;
      case 'send':
        this.current = 'send';
        break;
      case '7':
        this.current = '7';
        break;
      case '8':
        this.current = '8';
        break;
      case '9':
        this.current = '9';
        break;
      case 'massSend':
        this.current = 'massSend';
        break;
      case 'massReceiv':
        this.current = 'massReceiv';
        break;
      case '3':
        this.current = '3';
        break;
      case '5':
        this.current = '5';
        break;
      case '6':
        this.current = '6';
        break;
      case '10':
        this.current = '10';
        break;
      case '12':
        this.current = '12';
        break;
      case '13':
        this.current = '13';
        break;
      case '15':
        this.current = '15';
        break;
      case '14':
        this.current = '14';
        break;
      case '16':
        this.current = '16';
        break;
      case '1':
        this.current = '1';
        break;
      case 'else':
        this.current = 'else';
        break;
      default:
        this.showBalance = false;
    }

  }

  currentTrx(){
    this.current = 'all';
  }

  clearSearch(){
    this.searchDataInp.nativeElement.value = '';
  }

  getDataByAddress(address: HTMLInputElement, amount: HTMLInputElement){
    this.balances = [];
  //   this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(`
  //   <div class='loader'>
  //     <div class="sticks">
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //       <div class="stick"></div>
  //     </div>
  //     <svg>
  //       <circle cx='50%' cy='50%' r='150'></circle>
  //     </svg>
  // </div>`);
    this.checkBtn.nativeElement.disabled = true;
    this.AccountService.rawData(address.value, parseInt(amount.value));
  }

  ngOnInit() {
    this.AccountService.getSpam();
  }

}
