import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewBankComponent } from './bank/new-bank/new-bank.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'newBank', component: NewBankComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
