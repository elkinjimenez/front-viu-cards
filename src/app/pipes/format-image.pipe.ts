import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImage'
})
export class FormatImagePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('XDDOSPUNTOS', ':').replace('XDPUNTOCOMA', ';').replace('XDCOMA', ',');
  }

}
