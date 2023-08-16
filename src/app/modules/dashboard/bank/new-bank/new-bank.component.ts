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

  selectedFile: File | null = null;

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
      name: ['Letras', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      image: [''],
      description: ['example'],
    });
  }

  ngOnInit() { }

  protected create() {
    try {
      this.fields.currentBank = {
        name: this.myForm.controls.name.value,
        image: this.myForm.controls.image.value != null ? `${this.myForm.controls.image.value}`.replace(':', 'XDDOSPUNTOS').replace(';', 'XDPUNTOCOMA').replace(',', 'XDCOMA') : null,
        description: this.myForm.controls.description.value ? this.myForm.controls.description.value : null,
      };
      this.$bank.create(this.fields.currentBank, this.fields.user.email!).subscribe(
        (resp: RespGeneral) => {
          console.log('Resp CreateBank: ', resp);
          if (resp.code == 200) {
            this.fields.currentBank = resp.data as Bank;
            this.utils.showMessage({ position: 'top', color: 'primary', message: `Banco ${this.fields.currentBank.name} creado exitosamente.` })
            this.$router.navigate(['/dashboard/cards']);
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message })
          }
        }
      );
    } catch (error) {
      this.utils.showMessage({ position: 'top', color: 'danger', message: `Error al crear el banco. Por favor intente de nuevo.` })
    }
  }

  protected findByEmailUserAndName() {
    if (this.fields?.user?.email)
      this.$bank.findByEmailUserAndName(this.fields.user.email, this.myForm.controls.name.value).subscribe(
        (resp: RespGeneral) => {
          console.log('Resp findByEmailUserAndName: ', resp);
          if (resp.code == 200) {
            const list = resp.data as Bank[];
            this.exits = list && list.length > 0;
          } else if (resp.code == 400) {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message })
          } else {
            this.exits = false;
          }
        }
      )
  }

  protected onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    let base64: string | null = null;
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        base64 = e.target?.result as string;
        this.myForm.controls.image.setValue(base64);
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
