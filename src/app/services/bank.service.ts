import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankService {

  constructor(
    private $http: HttpGeneralService,
  ) { }

  public findByEmailUser(email: string) {
    return this.$http.get(`${environment.urlApi}bank/findByEmailUser?email=${email}`);
  }

  public findByEmailUserAndName(email: string, name: string) {
    return this.$http.get(`${environment.urlApi}bank/findByEmailUserAndName?email=${email}&name=${name}`);
  }

}
