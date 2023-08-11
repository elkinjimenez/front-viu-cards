import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Bank } from 'src/app/models/bank';
import { RespGeneral } from 'src/app/models/resp-general';
import { BankService } from 'src/app/services/bank.service';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class BanksComponent implements OnInit {

  listBanks: Bank[] = [];

  constructor(
    protected fields: FieldsService,
    private utils: Utils,
    private $bank: BankService,
  ) { }

  ngOnInit() {
    this.findBankByEmailUser();
  }

  findBankByEmailUser() {
    if (this.fields?.user?.email) {
      this.$bank.findByEmailUser(this.fields.user.email).subscribe(
        (resp: RespGeneral) => {
          console.log('findByEmailUser: ', resp);
          if (resp.code == 200 && resp.data) {
            this.listBanks = resp.data as Bank[];
          }
        }
      )
    } else {
      this.utils.showMessage({ position: 'top', color: 'danger', message: 'No hay usuario logueado.' })
    }
  }

}
