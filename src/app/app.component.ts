import { Component } from '@angular/core';
import { FieldsService } from './services/fields.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    protected fields: FieldsService,
  ) {
    this.validateLogin();
  }

  validateLogin() {
    const user = sessionStorage.getItem(btoa('userLoggedIn'));
    if (user) {
      this.fields.user = JSON.parse(atob(user));
    } else {
      this.fields.user = {
        email: 'ef.c@df.com',
        firstName: 'Luisa',
        lastName: 'W'
      }
      sessionStorage.setItem(btoa('userLoggedIn'), btoa(JSON.stringify(this.fields.user)));
    }
  }
}
