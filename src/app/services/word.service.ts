import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { Word } from '../models/word';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(
    private $http: HttpGeneralService,
  ) { }

  public findByIdBank(idBank: number) {
    return this.$http.get(`${environment.urlApi}word/findByIdBank?idBank=${idBank}`);
  }

  public create(body: Word) {
    return this.$http.post(`${environment.urlApi}word/create`, body);
  }

  public deleteById(idWord: number) {
    return this.$http.get(`${environment.urlApi}word/delete?idWord=${idWord}`);
  }
}
