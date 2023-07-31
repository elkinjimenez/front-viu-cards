import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RespGeneral } from 'src/app/models/resp-general';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Utils } from 'src/app/utils/util';
import { GoBackComponent } from '../../shared/go-back/go-back.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, ReactiveFormsModule, CommonModule, GoBackComponent]
})
export class RegisterComponent implements OnInit {

  public formRegister: FormGroup;

  constructor(
    private fb: FormBuilder,
    private $auth: AuthService,
    private $router: Router,
    private utils: Utils,
  ) {
    this.formRegister = this.fb.group({
      firstName: ['Elkin', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      lastName: ['Jimenez', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
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

  protected register() {
    const body: User = {
      email: this.formRegister.controls.email.value,
      password: this.utils.convertSHA256(this.formRegister.controls.password.value),
      firstName: this.formRegister.controls.firstName.value,
      lastName: this.formRegister.controls.lastName.value,
    }
    this.$auth.register(body).subscribe((resp: RespGeneral) => {
      console.log('Register: ', resp);
      if (resp.code == 200) {
        this.utils.showMessage({ color: 'primary', message: `Bienvenido ${body.firstName}. Puedes iniciar sesión con tus credenciales creadas.`, position: 'top' });
        this.$router.navigate(['/public']);
      } else {
        this.utils.showMessage({ color: 'danger', message: resp.message, position: 'top' });
      }
    });
  }

}
