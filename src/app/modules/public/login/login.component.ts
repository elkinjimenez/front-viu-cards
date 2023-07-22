import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RespGeneral } from 'src/app/models/resp-general';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, RouterLink]
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;

  isToastOpen = false;

  constructor(
    private fb: FormBuilder,
    private $auth: AuthService,
    private fields: FieldsService,
    private utils: Utils,
  ) {
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

  protected auth() {
    const body: User = {
      email: this.formLogin.controls.email.value,
      password: this.formLogin.controls.password.value,
    }
    this.$auth.auth(body).subscribe((resp: RespGeneral) => {
      console.log('Auth: ', resp);
      if (resp.code == 200) {
        this.fields.user = resp.data as User;
        sessionStorage.setItem('userLoggedIn', JSON.stringify(this.fields.user));
        // this.$router.navigate(['/home']);
        this.utils.showMessage({ color: 'primary', message: `Bienvenido ${this.fields.user.firstName} ${this.fields.user.lastName}`, position: 'top' });
      } else {
        this.utils.showMessage({ color: 'danger', message: resp.message, position: 'top' });
      }
    });
  }

}
