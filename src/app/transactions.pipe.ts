import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactions'
})
export class TransactionsPipe implements PipeTransform {

  transform(items: Object[], value: string): any {
    console.log(value)
    if(!items) return [];
    if(!value) return items;
    value = value.toLowerCase();
    return items.filter( trx => {
      return trx['string1'][2].toLowerCase().includes(value) || trx['string2'][2].toLowerCase().includes(value) || trx['string4'][1].toLowerCase().includes(value)
    });
  }

}
