import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSponsor'
})
export class ImageSponsorPipe implements PipeTransform {

  transform(value: string): string {
    return value ? 'https://congress-wtk.s3-eu-west-1.amazonaws.com/sponsors/' + value + '.jpeg' : '' ;
  }

}
