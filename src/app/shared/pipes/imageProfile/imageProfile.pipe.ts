import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageProfile'
})
export class ImageProfilePipe implements PipeTransform {

  transform(value: string): string {
    return value ? 'https://congress-wtk.s3-eu-west-1.amazonaws.com/profile/' + value + '.jpg' : 'assets/img/no_image_user.webp' ;
  }

}
