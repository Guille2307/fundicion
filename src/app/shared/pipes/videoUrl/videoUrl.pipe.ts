import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'videoUrl'
})
export class VideoUrlPipe implements PipeTransform {

  transform(array) : any {
    const json = JSON.parse(array);
    return json['video'];
  }

}
