import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { HttpGeneralService } from './http-general.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private $http: HttpGeneralService,
  ) { }

  public auth(body: User) {
    return this.$http.put(`${environment.urlApi}user/login`, body);
  }

}
