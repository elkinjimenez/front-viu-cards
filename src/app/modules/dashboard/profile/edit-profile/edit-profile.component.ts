import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FieldsService } from 'src/app/services/fields.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {

  selectedFile: File | null = null;

  public myForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private fields: FieldsService,
    // private $auth: AuthService,
    // private utils: Utils,
  ) {
    this.myForm = this.fb.group({
      firstName: [fields.user.firstName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      lastName: [fields.user.lastName, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      email: [fields.user.email, [
        Validators.required,
        Validators.email,
        Validators.minLength(2),
        Validators.maxLength(255),
      ]],
      image: [''],
    });
    this.myForm.controls.email.disable();
  }

  ngOnInit() { }

  edit() {

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
