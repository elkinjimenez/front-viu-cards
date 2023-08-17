import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Utils } from 'src/app/utils/util';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class GoBackComponent implements OnInit {

  @Input() path: string | undefined;

  constructor(
    protected utils: Utils,
  ) { }

  ngOnInit() { }

  goBack() {
    this.utils.navigate(this.path!);
  }

}
