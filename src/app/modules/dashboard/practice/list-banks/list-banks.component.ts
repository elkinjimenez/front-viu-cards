import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { RespGeneral } from 'src/app/models/resp-general';
import { Word } from 'src/app/models/word';
import { BankService } from 'src/app/services/bank.service';
import { FieldsService } from 'src/app/services/fields.service';
import { WordService } from 'src/app/services/word.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-list-banks',
  templateUrl: './list-banks.component.html',
  styleUrls: ['./list-banks.component.scss'],
})
export class ListBanksComponent implements OnInit {

  constructor(
    protected fields: FieldsService,
    protected utils: Utils,
    private $bank: BankService,
    private $word: WordService,
  ) {
    this.findBankByEmailUser();
  }

  ngOnInit() { }

  findBankByEmailUser() {
    if (this.fields?.user?.email) {
      this.$bank.findByEmailUser(this.fields.user.email).subscribe(
        (resp: RespGeneral) => {
          console.log('findByEmailUser: ', resp);
          if (resp.code == 200 && resp.data) {
            this.fields.listBanks = resp.data as Bank[];
            this.checkStatusBanks();
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message });
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay usuario logueado.' })
    }
  }

  protected selectBank(bank: Bank) {
    this.fields.currentBank = bank;
    localStorage.setItem('currentBank', JSON.stringify(this.fields.currentBank));
    this.utils.navigate('/dashboard/practice');
  }

  private checkStatusBanks() {
    this.fields.listBanks.forEach(bank => {
      bank.percentage = -1;
      this.$word.findByIdBankOnlyRetentionLevel(bank.id!).subscribe(
        (resp: RespGeneral) => {
          console.log("Respuesta de words", resp);
          if (resp.code == 200 && resp.data) {
            const listWords = resp.data as Word[];
            if (listWords?.length > 0) {
              const total = listWords.reduce((sum, word) => sum + word.retentionLevel!, 0);
              if (total) {
                bank.percentage = Math.round((total * 100) / (listWords.length * 3));
              }
            }
          };
          this.fields.listBanks.sort((a, b) => a.percentage! - b.percentage!);
          console.log('Termina en: ', this.fields.listBanks);
        }
      )
    })
  }

}
