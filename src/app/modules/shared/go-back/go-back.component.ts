import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-go-back',
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class GoBackComponent implements OnInit {

  @Input() path: string | undefined;

  constructor(
    private $router: Router,
  ) { }

  ngOnInit() { }

  /**
   * The function "goBack" navigates the user back to the previous page using the Angular router.
   */
  protected goBack() {
    this.$router.navigate([this.path]);
  }

}
