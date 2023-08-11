import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [GoBackComponent, IonicModule, CommonModule]
})
export class CardsComponent implements OnInit {

  constructor(
    protected fields: FieldsService,
  ) { }

  ngOnInit() { }

}
