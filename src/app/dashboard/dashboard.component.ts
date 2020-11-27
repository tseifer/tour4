import { Component, OnInit } from '@angular/core';
import {IHero} from '../models/IHero';
import {HeroService} from '../services/hero.service';
import {Router} from '@angular/router';
import {IClient} from '../models/IClient';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes : IHero[] = [];
  clients: IClient[] = [];

  constructor(private heroService : HeroService,
              private router: Router,
              private clientService: ClientService
        ) { }

  ngOnInit(): void {
    this.getHeroes()
    this.getClients()
  }

  getHeroes(){
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(0,9))
  }
  getClients(){
    this.clientService.getClients()
      .subscribe(client => this.clients = client.slice(0,9))
  }


  showHeroDetails(hero) {
    this.router.navigate([`hero-detail`, hero._id]);
  }
  showClientDetails(client) {
    this.router.navigate([`client-detail`, client._id]);
  }

}

