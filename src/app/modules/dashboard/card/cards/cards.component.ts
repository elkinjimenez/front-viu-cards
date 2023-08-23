import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Bank } from 'src/app/models/bank';
import { RespGeneral } from 'src/app/models/resp-general';
import { Word } from 'src/app/models/word';
import { BankService } from 'src/app/services/bank.service';
import { FieldsService } from 'src/app/services/fields.service';
import { WordService } from 'src/app/services/word.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {

  constructor(
    protected fields: FieldsService,
    protected utils: Utils,
    private $word: WordService,
    private $bank: BankService,
    private actionSheetController: ActionSheetController,
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
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay banco seleccionado.' })
    }
  }

  protected async removeBank() {
    const actionSheet = await this.actionSheetController.create({
      header: `¿Está seguro que desea eliminar el banco ${this.fields.currentBank.name}?`,
      subHeader: `Recuerda que al eliminar el banco se eliminan sus tarjetas asociadas.`,
      buttons: [
        {
          text: 'No, mantener banco',
          icon: 'arrow-undo-outline'
        },
        {
          text: 'Si, eliminar banco',
          icon: 'close-outline',
          handler: () => {
            this.deleteIdBank(this.fields.currentBank);

          }
        }
      ]
    });
    await actionSheet.present();
  }

  protected async removeCard(word: Word) {
    const actionSheet = await this.actionSheetController.create({
      header: `¿Está seguro que desea eliminar la tarjeta ${word.text}?`,
      subHeader: `${word.meaning}`,
      buttons: [
        {
          text: 'No, mantener tarjeta',
          icon: 'arrow-undo-outline'
        },
        {
          text: 'Si, eliminar tarjeta',
          icon: 'close-outline',
          handler: () => {
            this.deleteIdWord(word);
          }
        }
      ]
    });
    await actionSheet.present();
  }

  private deleteIdBank(bank: Bank) {
    this.$bank.deleteById(bank.id!).subscribe(
      (resp: RespGeneral) => {
        console.log('Resp deleteIdBank: ', resp);
        if (resp.code == 200) {
          this.utils.showMessage({ color: 'primary', position: 'top', message: `Banco ${bank.name} eliminado correctamente.` });
          this.utils.navigate('/dashboard');
        } else {
          this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
        }
      }
    )
  }

  private deleteIdWord(word: Word) {
    this.$word.deleteById(word.id).subscribe(
      (resp: RespGeneral) => {
        console.log('Resp deleteIdWord: ', resp);
        if (resp.code == 200) {
          this.findByIdBank();
          this.utils.showMessage({ color: 'primary', position: 'top', message: `Tarjeta ${word.text} eliminada correctamente.` });
        } else {
          this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
        }
      }
    )
  }

}
