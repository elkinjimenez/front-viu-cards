import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class ProfileComponent implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    protected fields: FieldsService,
    private $router: Router,
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
    sessionStorage.clear();
    localStorage.clear();
    this.$router.navigate(['/public']);
  }

}
