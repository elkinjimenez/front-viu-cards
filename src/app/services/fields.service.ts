import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Bank } from '../models/bank';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  public user!: User;
  public currentBank!: Bank;

  constructor(
    private $router: Router,
  ) {
    this.validateLogin();
  }

  validateLogin() {
    const user = sessionStorage.getItem(btoa('userLoggedIn'));
    if (user) {
      this.user = JSON.parse(atob(user));
      // this.$router.navigate(['/dashboard']);
    } else {
      this.user = {
        email: 'ef.c@df.c',
        firstName: 'Luisa',
        lastName: 'W'
      }
      // this.$router.navigate(['/public']);
    }
  }
}
