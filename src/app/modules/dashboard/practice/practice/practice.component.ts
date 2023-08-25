import { Component, OnInit } from '@angular/core';
import { RespGeneral } from 'src/app/models/resp-general';
import { Word } from 'src/app/models/word';
import { FieldsService } from 'src/app/services/fields.service';
import { WordService } from 'src/app/services/word.service';
import { Utils } from 'src/app/utils/util';

import * as lodash from 'lodash';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.scss'],
})
export class PracticeComponent implements OnInit {

  public myForm: FormGroup;

  protected newListCards: CurrentCard[] = [];
  private errorListCards: CurrentCard[] = [];
  protected listOptions: CardOption[] = [];

  protected currentCard: CurrentCard = { complete: false, isError: false };

  constructor(
    private fb: FormBuilder,
    protected fields: FieldsService,
    private $word: WordService,
    protected utils: Utils,
    private actionSheetController: ActionSheetController,
  ) {
    this.myForm = this.fb.group({
      responseText: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
      ]]
    });
  }

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
            this.newListCards = [];
            const list = lodash.shuffle(this.fields.listCards);
            list.forEach(word => {
              this.newListCards.push({
                word: { ...word },
                complete: false,
                isError: false,
              })
            })
            if (this.newListCards.length > 0) {
              this.selectNewCard();
            }
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay banco seleccionado.' })
    }
  }

  private selectNewCard() {
    this.myForm.reset();
    if (this.newListCards.length > 0) {
      this.currentCard = this.newListCards.shift()!;
      this.currentCard.type = Math.floor(Math.random() * 3) + 1;
      if (this.currentCard.type !== 3) {
        this.optionsForType1();
      }
      console.log('Current Card: ', this.currentCard);
    } else if (this.errorListCards.length > 0) {
      this.newListCards = [...this.errorListCards];
      this.errorListCards = [];
      this.selectNewCard();
    } else {
      this.utils.showMessage({ message: `Excelente. Has completado la práctica.`, color: 'primary', position: 'bottom' });
    }
    console.log('NewList: ', this.newListCards);
    console.log('ErrorList: ', this.errorListCards);
  }

  protected validateResponse() {
    if (this.currentCard.word?.text.toLowerCase().trim() == this.myForm.controls.responseText.value.toLowerCase().trim()) {
      this.utils.showMessage({ message: `Excelente.`, color: 'primary', position: 'bottom' });
      this.currentCard!.word!.retentionLevel = 3;
    } else {
      this.errorListCards.push({ word: { ...this.currentCard!.word! }, complete: false, isError: true });
      this.currentCard!.word!.retentionLevel = this.currentCard.isError ? 1 : 2;
      this.utils.showMessage({ message: `Respuesta incorrecta, lo lograrás a la próxima.`, color: 'danger', position: 'bottom' });
    }
    const wordUpdate: Word = { ...this.currentCard.word! };
    this.$word.update(wordUpdate).subscribe(
      (resp: RespGeneral) => {
        console.log('Resp updateWord: ', resp);
      }
    );
    this.selectNewCard();
  }

  private optionsForType1() {
    this.listOptions = [];
    this.listOptions.push({
      ...this.currentCard!.word!,
      selected: false,
    });
    const list = lodash.shuffle(this.fields.listCards);
    for (let i = 0; this.listOptions.length < 4; i++) {
      const add = list[i];
      if (this.currentCard.word?.text !== add.text) {
        this.listOptions.push({
          ...add,
          selected: false,
        });
      }
    }
    this.listOptions = lodash.shuffle(this.listOptions);
    console.log('Options: ', this.listOptions);
  }

  change() {
    console.log('responseText: ', this.myForm.controls.responseText.value);
  }

  protected selectBtn(card: CardOption) {
    this.listOptions.forEach(option => option.selected = false);
    card.selected = true;
    this.myForm.controls.responseText.setValue(card.text);
    console.log('Options: ', this.listOptions);
    this.currentCard.complete = true;
    this.change();
  }

  protected async goBack() {
    const actionSheet = await this.actionSheetController.create({
      header: `¿Está seguro que desea salir de la práctica?`,
      subHeader: `El conteo de los intentos fallidos no se perderá. Al volver, iniciará de nuevo la práctica.`,
      buttons: [
        {
          text: 'No, seguir practicando',
          icon: 'arrow-undo-outline'
        },
        {
          text: 'Si, abandonar práctica',
          icon: 'close-outline',
          handler: () => {
            this.utils.navigate('/dashboard');
          }
        }
      ]
    });
    await actionSheet.present();
  }

}

interface CurrentCard {
  word?: Word;
  type?: number;
  complete: boolean;
  isError: boolean;
}

interface CardOption extends Word {
  selected: boolean;
}