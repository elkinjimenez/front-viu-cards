import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-button-profile',
  templateUrl: './button-profile.component.html',
  styleUrls: ['./button-profile.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ButtonProfileComponent implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    protected fields: FieldsService,
    private $router: Router,
  ) { }

  ngOnInit() { }

  async actionSheet() {
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

}
