import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    // private $auth: AuthService,
    // private utils: Utils,
  ) {
    this.myForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
    });
  }

  ngOnInit() { }

  change() {

  }

}
