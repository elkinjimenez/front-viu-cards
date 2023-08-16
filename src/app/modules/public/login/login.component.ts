import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RespGeneral } from 'src/app/models/resp-general';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  isToastOpen = false;

  constructor(
    private fb: FormBuilder,
    private $auth: AuthService,
    private fields: FieldsService,
    private $router: Router,
    private utils: Utils,
  ) {
    this.validateLogin();
    this.formLogin = this.fb.group({
      email: ['example2@example.com', [
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      password: ['12345', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
    });
  }

  ngOnInit() { }

  validateLogin() {
    const user = localStorage.getItem(btoa('userLoggedIn'));
    if (user) {
      this.fields.user = JSON.parse(atob(user));
      this.$router.navigate(['/dashboard']);
    } else {
      this.fields.user = {
        email: 'ef.c@df.com',
        firstName: 'Luisa',
        lastName: 'W'
      }
      localStorage.setItem(btoa('userLoggedIn'), btoa(JSON.stringify(this.fields.user)));
      this.$router.navigate(['/public']);
    }
  }

  protected auth() {
    const body: User = {
      email: this.formLogin.controls.email.value,
      password: this.utils.convertSHA256(this.formLogin.controls.password.value),
    }
    this.$auth.auth(body).subscribe((resp: RespGeneral) => {
      console.log('Auth: ', resp);
      if (resp.code == 200) {
        this.fields.user = resp.data as User;
        delete this.fields.user.password;
        localStorage.setItem(btoa('userLoggedIn'), btoa(JSON.stringify(this.fields.user)));
        this.$router.navigate(['/dashboard']);
        this.utils.showMessage({ color: 'primary', message: `Bienvenido ${this.fields.user.firstName} ${this.fields.user.lastName}`, position: 'top' });
      } else {
        this.utils.showMessage({ color: 'danger', message: resp.message, position: 'top' });
      }
    });
  }

}
