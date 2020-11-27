import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {IHero} from '../models/IHero';
import {HeroService} from '../services/hero.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {ClientService} from '../services/client.service';
import {IClient} from '../models/IClient';

@Component({
  selector: 'app-search-hero',
  templateUrl: './search-hero.component.html',
  styleUrls: ['./search-hero.component.css']
})
export class SearchHeroComponent implements OnInit {

  term: string;
  heroes: Observable<IHero[]>;
  clients: Observable<IClient[]>;
  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroService,
              private clientService: ClientService) {
  }

  search(term: string): void {
    this.searchTerm.next(term);

  }

  ngOnInit(): void {

    this.heroes = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.heroService.searchHero(term))
      );

  //SAME BUT FOR CLIENTS

    this.clients = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.clientService.searchClient(term)),
    );
  }


}
