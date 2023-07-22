import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, catchError, retry } from 'rxjs';
import { Utils } from '../utils/util';
import { RespGeneral } from '../models/resp-general';

@Injectable({
  providedIn: 'root'
})
export class HttpGeneralService {

  constructor(
    private $http: HttpClient,
    private utils: Utils,
  ) { }

  public get(url: string) {
    return this.$http.get<RespGeneral>(url)
      .pipe(
        retry(3),
        catchError(() => {
          return this.showMessage();
        })
      )
  }

  public put(url: string, body: any) {
    return this.$http.put<RespGeneral>(url, body)
      .pipe(
        retry(3),
        catchError(() => {
          return this.showMessage();
        })
      )
  }

  public post(url: string, body: any) {
    return this.$http.post<RespGeneral>(url, body)
      .pipe(
        retry(3),
        catchError(() => {
          return this.showMessage();
        })
      )
  }

  private showMessage(): Observable<any> {
    this.utils.showMessage({
      message: 'Error de conexión. Por favor intente de nuevo',
      color: 'danger',
      position: 'top'
    })
    return EMPTY;
  }
}
