import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Card } from 'src/app/models/card';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [GoBackComponent, IonicModule, CommonModule, RouterLink]
})
export class CardsComponent implements OnInit {

  listCards: Card[] = [];

  constructor(
    protected fields: FieldsService,
  ) { }

  ngOnInit() { }

}
