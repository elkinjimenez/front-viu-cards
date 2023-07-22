import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  public user!: User;

  constructor() { }
}
