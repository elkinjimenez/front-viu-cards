import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class DashboardComponent implements OnInit {

  backButtonSubscription: Subscription | undefined;

  constructor(
    protected fields: FieldsService,
    private actionSheetController: ActionSheetController,
    private $router: Router,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => { });
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

}
