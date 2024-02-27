import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  transform(value) : any {
    const json = JSON.parse(value);
    let keys = [];
    for (let key in json) {
      keys.push({key: key, value: json[key]});
    }
    return keys;
  }
}
