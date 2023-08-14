import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, GoBackComponent]
})
export class NewCardComponent implements OnInit {

  constructor(
    protected fields: FieldsService,
  ) { }

  ngOnInit() { }

}
