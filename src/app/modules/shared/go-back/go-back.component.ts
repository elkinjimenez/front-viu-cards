import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GoBackComponent implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  ngOnInit() { }

  /**
   * The function "goBack" is used to navigate back to the previous page in a navigation stack.
   */
  protected goBack() {
    this.navCtrl.pop();
  }

}
