import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RespGeneral } from 'src/app/models/resp-general';
import { Word } from 'src/app/models/word';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { FieldsService } from 'src/app/services/fields.service';
import { WordService } from 'src/app/services/word.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
  standalone: true,
  imports: [GoBackComponent, IonicModule, CommonModule, RouterLink]
})
export class CardsComponent implements OnInit {

  protected listCards: Word[] = [];

  constructor(
    protected fields: FieldsService,
    private utils: Utils,
    private $word: WordService,
  ) { }

  ngOnInit() {
    localStorage.setItem('currentBank', JSON.stringify(this.fields.currentBank));
    this.findByIdBank();
  }

  private findByIdBank() {
    if (this.fields?.currentBank?.id) {
      this.$word.findByIdBank(this.fields.currentBank.id).subscribe(
        (resp: RespGeneral) => {
          console.log('Resp findByIdBank: ', resp);
          if (resp.code == 200 && resp.data) {
            this.listCards = resp.data as Word[];
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay banco seleccionado.' })
    }
  }

}
