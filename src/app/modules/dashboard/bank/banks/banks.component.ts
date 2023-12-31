import { Component, OnInit } from '@angular/core';
import { Bank } from 'src/app/models/bank';
import { RespGeneral } from 'src/app/models/resp-general';
import { BankService } from 'src/app/services/bank.service';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
})
export class BanksComponent implements OnInit {

  constructor(
    protected fields: FieldsService,
    protected utils: Utils,
    private $bank: BankService,
  ) {
    this.findBankByEmailUser();
  }

  ngOnInit() {
  }

  findBankByEmailUser() {
    if (this.fields?.user?.email) {
      this.$bank.findByEmailUser(this.fields.user.email).subscribe(
        (resp: RespGeneral) => {
          console.log('findByEmailUser: ', resp);
          if (resp.code == 200 && resp.data) {
            this.fields.listBanks = resp.data as Bank[];
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
    this.utils.navigate('/dashboard/cards');
  }

}
