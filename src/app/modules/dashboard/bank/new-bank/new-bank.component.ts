import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Bank } from 'src/app/models/bank';
import { RespGeneral } from 'src/app/models/resp-general';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { BankService } from 'src/app/services/bank.service';
import { FieldsService } from 'src/app/services/fields.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-new-bank',
  templateUrl: './new-bank.component.html',
  styleUrls: ['./new-bank.component.scss'],
  standalone: true,
  imports: [SharedModule, GoBackComponent, IonicModule, CommonModule, ReactiveFormsModule]
})
export class NewBankComponent implements OnInit {

  exits?= false;

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private $bank: BankService,
    private fields: FieldsService,
    private $router: Router,
    private utils: Utils,
  ) {
    this.myForm = this.fb.group({
      name: ['Número', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      image: [''],
    });
  }

  ngOnInit() { }

  protected create() {
    this.fields.currentBank = {
      name: 'Números',
    };
    this.$router.navigate(['/dashboard/cards']);
  }

  protected findByEmailUserAndName() {
    if (this.fields?.user?.email)
      this.$bank.findByEmailUserAndName(this.fields.user.email, this.myForm.controls.name.value).subscribe(
        (resp: RespGeneral) => {
          console.log('Resp findByEmailUserAndName: ', resp);
          if (resp.code == 200 && resp.data) {
            const list = resp.data as Bank[];
            this.exits = list && list.length > 0;
          } else {
            this.exits = false;
          }
        }
      )
  }

}
