import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink]
})
export class GoBackComponent implements OnInit {

  constructor() { }

  ngOnInit() { }

}
