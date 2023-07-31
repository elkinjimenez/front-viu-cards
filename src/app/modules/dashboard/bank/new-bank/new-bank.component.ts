import { Component, OnInit } from '@angular/core';
import { GoBackComponent } from 'src/app/modules/shared/go-back/go-back.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@Component({
  selector: 'app-new-bank',
  templateUrl: './new-bank.component.html',
  styleUrls: ['./new-bank.component.scss'],
  standalone: true,
  imports: [SharedModule, GoBackComponent]
})
export class NewBankComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
