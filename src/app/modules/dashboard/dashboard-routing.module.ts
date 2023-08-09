import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewBankComponent } from './bank/new-bank/new-bank.component';
import { CardsComponent } from './card/cards/cards.component';
import { NewCardComponent } from './card/new-card/new-card.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'newBank', component: NewBankComponent },
  { path: 'cards', component: CardsComponent },
  { path: 'newCard', component: NewCardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
