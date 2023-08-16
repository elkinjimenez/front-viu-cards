import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
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
