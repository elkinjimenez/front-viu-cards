import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ActionSheetController, IonicModule, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Bank } from 'src/app/models/bank';
import { RespGeneral } from 'src/app/models/resp-general';
import { BankService } from 'src/app/services/bank.service';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';
import { ButtonProfileComponent } from '../profile/button-profile/button-profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, ButtonProfileComponent]
})
export class DashboardComponent implements OnInit {

  backButtonSubscription: Subscription | undefined;

  listBanks: Bank[] = [];

  constructor(
    protected fields: FieldsService,
    private platform: Platform,
    private utils: Utils,
    private $bank: BankService,
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => { });
    this.findBankByEmailUser();
  }

  ngOnDestroy() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }



  findBankByEmailUser() {
    if (this.fields?.user?.email) {
      this.$bank.findByEmailUser(this.fields.user.email).subscribe(
        (resp: RespGeneral) => {
          console.log('findByEmailUser: ', resp);
          if (resp.code == 200 && resp.data) {
            // this.listBanks = resp.data as Bank[];
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay usuario logueado.' })
    }
  }

}
