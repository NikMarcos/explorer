import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone  } from '@angular/core';
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
  @ViewChild("filter", {static: false}) filterTab: ElementRef;
  @ViewChild("checkBtn", {static: false}) checkBtn: ElementRef;
  transactions: Object[] = [];
  ids: Object = {};
  htmlToAdd: SafeHtml;
  // clicked: boolean = false;
  allTxs: string;

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



  constructor(private AccountService: AccountDataService, private sanitizer: DomSanitizer, private zone: NgZone) {
    this.AccountService.allTransactions.subscribe((trans: Object[]) => {
      this.transactions = trans;
      this.countAllTxs = this.transactions.length - 1
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
      if (typeof Worker !== 'undefined') {
        const worker = new Worker('./html-trans.worker', { type: 'module' });
        if(this.transactions.length > 0 && this.ids){
          worker.postMessage({transactions: this.transactions, assets: this.ids});

          worker.onmessage = ({ data }) => {
            // this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(data);
            this.allTxs = data;
            $('#goal').html(this.allTxs);
            this.checkBtn.nativeElement.disabled = false;
            ////////////////////////////
            if (typeof Worker !== 'undefined') {
              // Create a new
              const sepWorker = new Worker('./separate-txs.worker', { type: 'module' });
              if(this.allTxs){

                sepWorker.postMessage({transactions: this.transactions, assets: this.ids});

                sepWorker.onmessage = ({ data }) => {
                  this.type1 = data['id1'][0];
                  this.typeDeposit = data['idDeposit'][0];
                  this.typeSend = data['idSend'][0];
                  this.type7 = data['id7'][0];
                  this.type8 = data['id8'][0];
                  this.type9 = data['id9'][0];
                  this.typeMassSend = data['idMassSend'][0];
                  this.typeMassReceive = data['idMassDeposit'][0];
                  this.type3 = data['id3'][0];
                  this.type5 = data['id5'][0];
                  this.type6 = data['id6'][0];
                  this.type10 = data['id10'][0];
                  this.type12 = data['id12'][0];
                  this.type13 = data['id13'][0];
                  this.type14 = data['id14'][0];
                  this.type15 = data['id15'][0];
                  this.type16 = data['id16'][0];
                  this.typeElse = data['idElse'][0];

                  this.zone.run(() => {
                  this.countType1 = data['id1'][1];
                  this.countTypeDeposit = data['idDeposit'][1];
                  this.countTypeSend = data['idSend'][1];
                  this.countType7 = data['id7'][1];
                  this.countType8 = data['id8'][1];
                  this.countType9 = data['id9'][1];
                  this.countTypeMassSend = data['idMassSend'][1];
                  this.countTypeMassReceive = data['idMassDeposit'][1];
                  this.countType3 = data['id3'][1];
                  this.countType5 = data['id5'][1];
                  this.countType6 = data['id6'][1];
                  this.countType10 = data['id10'][1];
                  this.countType12 = data['id12'][1];
                  this.countType13 = data['id13'][1];
                  this.countType14 = data['id14'][1];
                  this.countType15 = data['id15'][1];
                  this.countType16 = data['id16'][1];
                  this.countTypeElse = data['idElse'][1];
                  });

                  this.filterTab.nativeElement.style.display = 'block';

                  console.log(this.type7, this.countType7)
                };

              }
            } else {
              // Web Workers are not supported in this environment.
              // You should add a fallback so that your program still executes correctly.
            }
            /////////////////////
            // this.filterTab.nativeElement.style.display = 'block';
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

  test(balance: HTMLInputElement){
    let elementId = balance.id;
    console.log(elementId);
    switch (elementId) {
      case 'all':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.allTxs);
        break;
      case 'deposit':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.typeDeposit);
        break;
      case 'send':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.typeSend);
        break;
      case '7':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type7);
        break;
      case '8':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type8);
        break;
      case '9':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type9);
        break;
      case 'massSend':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.typeMassSend);
        break;
      case 'massReceiv':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.typeMassReceive);
        break;
      case '3':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type3);
        break;
      case '5':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type5);
        break;
      case '6':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type6);
        break;
      case '10':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type10);
        break;
      case '12':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type12);
        break;
      case '13':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type13);
        break;
      case '15':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type15);
        break;
      case '14':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type14);
        break;
      case '16':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type16);
        break;
      case '1':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.type1);
        break;
      case 'else':
        this.htmlToAdd = this.sanitizer.bypassSecurityTrustHtml(this.typeElse);
        break;
      default:
        alert( "Нет таких значений" );
    }

  }

  getDataByAddress(address: HTMLInputElement){

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
    this.checkBtn.nativeElement.disabled = true;
    this.filterTab.nativeElement.style.display = 'none';
    this.AccountService.rawData(address.value);
  }

  ngOnInit() {
    this.AccountService.getSpam();
  }

}
