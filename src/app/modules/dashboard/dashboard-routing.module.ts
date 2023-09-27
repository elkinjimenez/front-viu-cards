import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewBankComponent } from './bank/new-bank/new-bank.component';
import { CardsComponent } from './card/cards/cards.component';
import { NewCardComponent } from './card/new-card/new-card.component';
import { BanksComponent } from './bank/banks/banks.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { ListBanksComponent } from './practice/list-banks/list-banks.component';
import { PracticeComponent } from './practice/practice/practice.component';
import { ChangePasswordComponent } from './profile/change-password/change-password.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: ListBanksComponent },
      { path: 'banks', component: BanksComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'newBank', component: NewBankComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'cards/newCard', component: NewCardComponent },
      { path: 'practice', component: PracticeComponent },
      { path: 'changePassword', component: ChangePasswordComponent },
      { path: 'editProfile', component: EditProfileComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
