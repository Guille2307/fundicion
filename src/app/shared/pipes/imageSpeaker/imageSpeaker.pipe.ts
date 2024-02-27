import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageSpeaker'
})
export class ImageSpeakerPipe implements PipeTransform {

  transform(value: string): string {
    return value ? 'https://congress-wtk.s3-eu-west-1.amazonaws.com/speakers/' + value + '.jpeg' : '' ;
  }

}
