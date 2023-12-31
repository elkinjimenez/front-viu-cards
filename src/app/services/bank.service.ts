import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { environment } from 'src/environments/environment';
import { Bank } from '../models/bank';

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

  public create(body: Bank, email: string) {
    return this.$http.post(`${environment.urlApi}bank/create?email=${email}`, body);
  }

  public deleteById(idBank: number) {
    return this.$http.get(`${environment.urlApi}bank/delete?idBank=${idBank}`);
  }

}
