import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileUser'
})
export class FileUserPipe implements PipeTransform {

  transform(value: string): string {
    return value ? 'https://congress-wtk.s3-eu-west-1.amazonaws.com/documents-eciciiplus/' + value : '';
  }

}
