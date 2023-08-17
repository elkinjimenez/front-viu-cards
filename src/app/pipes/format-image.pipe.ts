import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatImage',
  standalone: true,
})
export class FormatImagePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace('XDDOSPUNTOS', ':').replace('XDPUNTOCOMA', ';').replace('XDCOMA', ',');
  }

}
