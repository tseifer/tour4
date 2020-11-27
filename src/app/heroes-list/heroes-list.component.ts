import { Component, OnInit } from '@angular/core';
import {IHero} from '../models/IHero';
import {HEROES} from '../mock-heros';
import {HeroService} from '../services/hero.service';
import {MessagesComponent} from '../massages/messages.component';
import {MessagesService} from '../services/messages.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.css']
})
export class HeroesListComponent implements OnInit {

    heroes: IHero[];
    selectedHero: IHero;

  constructor(private heroService: HeroService , private messageService: MessagesService, private router : Router) { }

  ngOnInit(): void {
    this.getHeroes();

  }

  private getHeroes() {
    this.heroService.getHeroes()
      .subscribe((data: IHero[]) => this.heroes = data);
  }

  onSelect(hero: IHero){
    this.messageService.addMassage('Hero Selected:  hero' + hero.name );
    this.router.navigate([`hero-detail`, hero._id]),
    this.selectedHero = hero;
  }

  delete(hero: IHero): void{
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

}
