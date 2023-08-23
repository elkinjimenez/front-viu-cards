import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RespGeneral } from 'src/app/models/resp-general';
import { Word } from 'src/app/models/word';
import { FieldsService } from 'src/app/services/fields.service';
import { WordService } from 'src/app/services/word.service';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss'],
})
export class NewCardComponent implements OnInit {

  selectedFile: File | null = null;

  exits?= false;

  public myForm: FormGroup;

  constructor(
    protected fields: FieldsService,
    private fb: FormBuilder,
    private utils: Utils,
    private $word: WordService,
  ) {
    this.myForm = this.fb.group({
      meaningEnglish: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      meaningSpanish: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      image: ['', [
        Validators.required,
      ]],
    });
  }

  ngOnInit() { }

  create() {
    try {
      let currentWord = {
        text: this.myForm.controls.meaningEnglish.value,
        meaning: this.myForm.controls.meaningSpanish.value,
        image: this.myForm.controls.image.value != null ? `${this.myForm.controls.image.value}`.replace(':', 'XDDOSPUNTOS').replace(';', 'XDPUNTOCOMA').replace(',', 'XDCOMA') : null,
        idBank: this.fields.currentBank.id,
      } as Word;
      this.$word.create(currentWord).subscribe(
        (resp: RespGeneral) => {
          console.log('Resp CreateWord: ', resp);
          if (resp.code == 200) {
            this.utils.showMessage({ position: 'top', color: 'primary', message: `Tarjeta ${currentWord.text} creada exitosamente.` })
            this.utils.navigate('/dashboard/cards');
          } else {
            this.utils.showMessage({ position: 'top', color: 'danger', message: resp.message })
          }
        }
      );
    } catch (error) {
      this.utils.showMessage({ position: 'top', color: 'danger', message: `Error al crear la tarteja. Por favor intente de nuevo.` })
    }
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
