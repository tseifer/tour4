import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  massages : string[] = [];


  constructor() {}

  addMassage(massage : string){
    this.massages.push(massage)
  }

  clearMassages(){
    this.massages = [];
  }


}
