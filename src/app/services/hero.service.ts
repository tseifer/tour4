import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {IHero} from '../models/IHero';
import {of} from 'rxjs';
import {HEROES} from '../mock-heros';
import {MessagesService} from './messages.service';
import {observableToBeFn} from 'rxjs/internal/testing/TestScheduler';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'http://localhost:5001/api/heroes/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private messageService: MessagesService,
              private route: Router) {
  }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl)
      .pipe(
        tap<IHero[]>(heroes => this.log(`fetched heroes`)),
        catchError((error) => {
          this.log(`Failed` + error && error.error && error.error.message);
            if (error && error.error && error.error.statusCode === 400) {
                this.route.navigate(['login']);
            }
          return of([]);
        })
      );
  };

  getHero(id: string): Observable<IHero> {
    const url = this.heroesUrl + `/${id}`;
    return this.http.get<IHero>(url)
      .pipe(
        tap<IHero>(hero => this.log(`fetched hero with id:` + id)),
        catchError((error) => {
          this.log(`Failed` + error.body.error);
          return of(undefined);
        })
      );
  };

  // getHero(id : number ): Observable<IHero>{
  //   this.messageService.addMassage(`HeroService: fetched hero with id:` + id);
  //   let hero: IHero = HEROES.find(h => h._id === _id);
  //   return of(hero)
  //

  /* Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.addMassage(`HeroService: ${message}`);
  }


  updateHero(hero: IHero): Observable<IHero> {
    const url = this.heroesUrl + `/${hero._id}`;

    return this.http.put<IHero>(url, hero, this.httpOptions)
      .pipe(
        tap<IHero>(() => {
          this.log(`Updated hero with id = ${hero._id} and name = ${hero.name}`);
        }),
        catchError((error) => {
          this.log(`Failed` + error.body.error);
          return of(undefined);
        }));
  }

  // httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})
  // };

  addHero(hero: IHero): Observable<IHero> {
    const url = this.heroesUrl;
    return this.http.post<IHero>(url, hero, this.httpOptions)
      .pipe(
        tap<IHero>((h => this.log(`added hero with name = ` + h.name + `new ID = ` + h._id))),
        catchError((error) => {
          this.log(`Failed adding hero with name: ` + hero.name + error.body.error);
          return of(undefined);
        })
      );

  }

  deleteHero(hero: IHero ) : Observable<IHero>{
    const id = typeof hero === `number` ? hero : hero._id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<IHero>(url, this.httpOptions).
      pipe(
      tap<IHero>(() => {
        this.log(`Deleted hero with named = ${hero.name} ID = ${hero._id}  `);
      }),
      catchError((error) => {
        this.log(`Failed` + error.body.error);
        return of(undefined);
      }));

  }


  searchHero(term: string): Observable<IHero[]> {
    term = term.trim();
    if (!term) {
      return of([]);
    }
    const url = this.heroesUrl + `/?name=${term}`;
    return this.http.get<IHero[]>(url)
      .pipe(
        tap<IHero[]>((results) => {
          if (results.length > 0) {
            this.log(`found results matching ${term}`)
          } else {
            this.log(`didn't find results matching ${term}`)
          }

        }),
        catchError((error) => {
          this.log(`Failed` + error.body.error);
          return of(undefined);
        }));

  }


}
