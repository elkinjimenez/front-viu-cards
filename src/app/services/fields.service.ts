import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Bank } from '../models/bank';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  public user!: User;
  public currentBank!: Bank;

  listBanks: Bank[] = [];

  listCards: Word[] = [];

  constructor() { }

}
