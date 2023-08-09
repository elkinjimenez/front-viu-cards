import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IonicModule, Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FieldsService } from 'src/app/services/fields.service';
import { ButtonProfileComponent } from '../profile/button-profile/button-profile.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLink, ButtonProfileComponent]
})
export class DashboardComponent implements OnInit {

  backButtonSubscription: Subscription | undefined;

  constructor(
    protected fields: FieldsService,
    private platform: Platform,
  ) { }

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribeWithPriority(0, () => { });
  }

  ngOnDestroy() {
    if (this.backButtonSubscription) {
      this.backButtonSubscription.unsubscribe();
    }
  }

}
