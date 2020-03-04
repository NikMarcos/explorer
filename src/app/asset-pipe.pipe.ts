import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetPipe',
  pure: false
})
export class AssetPipePipe implements PipeTransform {

  transform(items: Object[], value: string): any {
    if(!items) return [];
    if(!value) return items;
    value = value.toLowerCase();
    return items.filter( asset => {
      return asset['issueTransaction']['name'].toLowerCase().includes(value) || asset['assetId'].toLowerCase().includes(value);
    });
  }

}
