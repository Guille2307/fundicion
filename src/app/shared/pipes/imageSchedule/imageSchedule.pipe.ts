import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSchedule'
})
export class ImageSchedulePipe implements PipeTransform {

  transform(value: string): string {
    return value ? 'https://congress-wtk.s3-eu-west-1.amazonaws.com/schedule/' + value  : '' ;
  }

}
