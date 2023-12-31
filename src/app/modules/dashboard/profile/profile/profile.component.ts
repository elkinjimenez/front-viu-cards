import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    protected fields: FieldsService,
    protected utils: Utils,
  ) { }

  ngOnInit() { }

  protected async confirmLogout() {
    const actionSheet = await this.actionSheetController.create({
      header: `¿Está seguro de cerrar sesión?`,
      subHeader: `${this.fields.user.firstName} ${this.fields.user.lastName}`,
      buttons: [
        {
          text: 'No, mantener sesión',
          icon: 'arrow-undo-outline'
        },
        {
          text: 'Si, cerrar sesión',
          icon: 'log-out-outline',
          handler: () => {
            this.logout();
          }
        }
      ]
    });
    await actionSheet.present();
  }

  private logout() {
    this.fields.user = {};
    // sessionStorage.clear();
    // localStorage.clear();
    this.utils.navigate('/public');
  }

}
