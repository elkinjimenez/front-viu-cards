import { Component } from '@angular/core';
import { FieldsService } from './services/fields.service';
import { Bank } from './models/bank';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  protected isCompleted: boolean = false;

  constructor(
    protected fields: FieldsService,
  ) {
    this.validateLogin();
    this.searchFieldsLocalStorage();
  }

  validateLogin() {
    const user = localStorage.getItem(btoa('userLoggedIn'));
    if (user) {
      this.fields.user = JSON.parse(atob(user));
    } else {
      this.fields.user = {
        email: 'ef.c@df.com',
        firstName: 'Luisa',
        lastName: 'W'
      }
      localStorage.setItem(btoa('userLoggedIn'), btoa(JSON.stringify(this.fields.user)));
    }
  }

  searchFieldsLocalStorage() {
    const currentBank = localStorage.getItem('currentBank');
    if (currentBank) {
      this.fields.currentBank = JSON.parse(currentBank) as Bank;
    }
    // DEJAR AL FINAL
    console.log('Datos completos...');
    this.isCompleted = true;
  }
}
