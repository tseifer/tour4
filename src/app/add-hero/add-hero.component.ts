import { Component, OnInit } from '@angular/core';
import {HeroService} from '../services/hero.service';
import {IHero} from '../models/IHero';
import {ClientService} from '../services/client.service';
import {IClient} from '../models/IClient';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {

  hName: string;
  cName: string;


  constructor(private heroService: HeroService,
              private clientService:ClientService) {
  }

  ngOnInit() {
  };

   addHero() {
     this.hName =this.hName.trim();
     if(!this.hName){
       return;
     }
     let hero = {name: this.hName} as IHero;
     console.log(`hero to add: `+ JSON.stringify(hero));
     this.heroService.addHero(hero).subscribe(
       ()=> {
         this.hName = ``
       }
     )
   }

   addClient() {
     this.cName = this.cName.trim();
     if(!this.cName){
       return;
     }
     let client = {name: this.cName} as IClient;
     console.log(`client to add: `+ JSON.stringify(client));
     this.clientService.addClient(client).subscribe(
       ()=> {
         this.cName = ``
       }
     )
   }

}



