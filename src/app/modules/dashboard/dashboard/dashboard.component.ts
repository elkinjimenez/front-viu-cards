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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class DashboardComponent implements OnInit {

  backButtonSubscription: Subscription | undefined;

  listBanks: Bank[] = [];

  constructor(
    protected fields: FieldsService,
    private actionSheetController: ActionSheetController,
    private $router: Router,
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

  async mostrarActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: `${this.fields.user.firstName} ${this.fields.user.lastName}`,
      subHeader: this.fields.user.email,
      buttons: [
        {
          text: 'Mi perfil',
          icon: 'person-outline',
          handler: () => {
            this.profile();
          }
        },
        {
          text: 'Cambiar contraseña',
          icon: 'lock-closed-outline',
          handler: () => {
            this.profile();
          }
        },
        {
          text: 'Cerrar sesión',
          icon: 'log-out-outline',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  profile() {
    console.log('Opción 1 seleccionada');
  }

  logout() {
    this.fields.user = {};
    sessionStorage.clear();
    localStorage.clear();
    this.$router.navigate(['/public']);
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
