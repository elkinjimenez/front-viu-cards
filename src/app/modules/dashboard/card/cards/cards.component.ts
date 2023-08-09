import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { ButtonProfileComponent } from '../../profile/button-profile/button-profile.component';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [GoBackComponent, IonicModule, CommonModule, ButtonProfileComponent]
})
export class CardsComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
