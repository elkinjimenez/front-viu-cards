import { Component, OnInit } from '@angular/core';
import { RespGeneral } from 'src/app/models/resp-general';
import { Word } from 'src/app/models/word';
import { FieldsService } from 'src/app/services/fields.service';
import { WordService } from 'src/app/services/word.service';
import { Utils } from 'src/app/utils/util';

import * as lodash from 'lodash';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent implements OnInit {

  protected newListCards: Word[] = [];

  protected currentCard: CurrentCard = {};

  constructor(
    protected fields: FieldsService,
    private $word: WordService,
    private utils: Utils,
  ) { }

  ngOnInit() {
    this.findByIdBank();
  }

  private findByIdBank() {
    if (this.fields?.currentBank?.id) {
      this.$word.findByIdBank(this.fields.currentBank.id).subscribe(
        (resp: RespGeneral) => {
          console.log('Resp findByIdBank: ', resp);
          if (resp.code == 200 && resp.data) {
            this.fields.listCards = resp.data as Word[];

            this.fields.listCards.forEach(x => {
              this.newListCards.push(x);
            })
            this.newListCards = lodash.shuffle(this.newListCards);
            if (this.newListCards.length > 0) {
              this.selectCardRandom();
            }
            console.log('Current Card: ', this.currentCard);
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay banco seleccionado.' })
    }
  }

  private selectCardRandom() {
    this.currentCard = {
      word: this.newListCards[0],
      index: 0,
      type: Math.floor(Math.random() * 3) + 1,
      complete: false,
    };
  }

}

interface CurrentCard {
  word?: Word;
  index?: number;
  type?: number;
  complete?: boolean;
}