import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";

import * as sha256 from 'crypto-js/sha256';

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
      duration: 2500,
      position: m.position,
      color: m.color
    });
    await toast.present();
  }

  public convertSHA256(text: string) {
    const hash = sha256(text).toString();
    return hash;
  }

}

interface modalMessage {
  position: 'top' | 'middle' | 'bottom';
  message: string;
  color: 'danger' | 'primary';
}