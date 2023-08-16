import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GoBackComponent } from '../shared/go-back/go-back.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    RouterLink,
    GoBackComponent,
    PublicRoutingModule,
  ]
})
export class PublicModule { }
