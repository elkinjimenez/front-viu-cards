import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Injectable({
  providedIn: 'root'
})
export class Utils {

  constructor(
    private toastController: ToastController,
  ) { }

  public async showMessage(m: modalMessage) {
    const toast = await this.toastController.create({
      message: m.message,
      duration: 1500,
      position: m.position,
      color: m.color
    });

    await toast.present();
  }

}

interface modalMessage {
  position: 'top' | 'middle' | 'bottom';
  message: string;
  color: 'danger' | 'primary';
}