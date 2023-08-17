import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { IonicModule } from '@ionic/angular';
import { ProfileComponent } from './profile/profile/profile.component';
import { RouterLink } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { GoBackComponent } from '../shared/go-back/go-back.component';
import { NewCardComponent } from './card/new-card/new-card.component';
import { CardsComponent } from './card/cards/cards.component';
import { NewBankComponent } from './bank/new-bank/new-bank.component';
import { BanksComponent } from './bank/banks/banks.component';
import { FormatImagePipe } from 'src/app/pipes/format-image.pipe';

@NgModule({
  declarations: [
    ProfileComponent,
    DashboardComponent,
    BanksComponent,
    NewBankComponent,
    CardsComponent,
    NewCardComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterLink,
    ReactiveFormsModule,
    GoBackComponent,
    DashboardRoutingModule,
    FormatImagePipe,
  ]
})
export class DashboardModule { }
