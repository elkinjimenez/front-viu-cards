import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Bank } from '../models/bank';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  public user!: User;
  public currentBank!: Bank;

  constructor() { }

}
