import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountDataService {
  commonArray: Object[] = [];
  currentList: Object = {null: ['Waves', 8]};
  spamList: String[] = [];

  public allTransactions: BehaviorSubject<Object[]> = new BehaviorSubject<Object[]>([]);
  public allAssets: BehaviorSubject<Object> = new BehaviorSubject<Object>({});



  constructor(private http: HttpClient) { }

  getRawData(address: string, amount: string, lastId = "0"){
    return this.http.get(`https://nodes.wavesnodes.com/debug/stateChanges/address/${address}/limit/${amount}?after=${lastId}`)
  }
  getAssetsData(items: string){
    return this.http.get(`https://api.wavesplatform.com/v0/assets?${items}`)
  }

  rawData(address: string, amount: number, lastId?: string): any {
    let amountOfTxs = amount;
    let amountToRawData = amountOfTxs < 1000 ? amountOfTxs.toString() : '1000'
    this.getRawData(address, amountToRawData, lastId).subscribe((data: Object[]) => {
      this.commonArray.push(...data);
      console.log(data.length);
      console.log(amountOfTxs);
      if(data.length && data.length < amountOfTxs){
        let lastId = data[data.length-1]['id'];
        this.rawData(address, amountOfTxs, lastId);
      } else {
        this.commonArray.unshift(address);
        this.allTransactions.next(this.commonArray);
        this.commonArray = [];
      }
    });
  }

  listIds(idsArray: String[]){
    let ids = idsArray;
    let items = ids.splice(0, 99).join('');
    this.getAssetsData(items).subscribe((data: Object[]) => {
      let names = data['data'];
      for (let i = 0; i < names.length; i++) {
        let fullArr = [];
        fullArr.push(names[i]['data']['name']);
        fullArr.push(names[i]['data']['precision']);
        this.spamList.includes(names[i]['data']['id']) ? fullArr.push('spam') : 0
        this.currentList[names[i]['data']['id']] = fullArr;
      }
      if (ids.length > 0) {
        this.listIds(ids);
      } else {
        // console.log(this.spamList)
        this.allAssets.next(this.currentList)
      }
    })
  }

  getSpam(){
    const headers = new HttpHeaders().set('Content-Type', 'text/plain; charset=utf-8');
    let rawSpam = this.http.get(`https://raw.githubusercontent.com/wavesplatform/waves-community/master/Scam%20tokens%20according%20to%20the%20opinion%20of%20Waves%20Community.csv`,{ headers, responseType: 'text'})
    rawSpam.subscribe((data: string) => {
      let spam = data.split("\n");
      this.spamList = spam
    });

  }

}

// const studentsObservable = new Observable(observer => {
//   observer.next(this.students)
// });
