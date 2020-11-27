import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../services/messages.service';

@Component({
  selector: 'app-massages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public massagesService : MessagesService) { }

  ngOnInit(): void {

  }

  clearMassages(){
    this.massagesService.clearMassages()
  }

}
