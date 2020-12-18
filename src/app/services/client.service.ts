import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessagesService} from './messages.service';
import {Observable} from 'rxjs/internal/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';
import {IClient} from '../models/IClient';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl = 'http://localhost:5001/api/clients';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient,
              private messageService: MessagesService,
              private route: Router) {
  }

  getClients(): Observable<IClient[]> {

    return this.http.get<IClient[]>(this.clientUrl)
      .pipe(
        tap<IClient[]>(heroes => this.log(`clients fetched`)),
        catchError((error) => {
            this.log(`Failed` + error && error.error && error.error.message);

            if (error && error.error && error.error.statusCode === 400) {
                this.route.navigate(['login']);
            }

          return of([]);
        })
      );
  };

  getClient(id: string): Observable<IClient> {
    const url = this.clientUrl + `/${id}`;
    return this.http.get<IClient>(url)
      .pipe(
        tap<IClient>(hero => this.log(`fetched client with id:` + id)),
        catchError((error) => {
          this.log(`Failed` + error.body.error);
          return of(undefined);
        })
      );
  };


  private log(message: string) {
    this.messageService.addMassage(`ClientService: ${message}`);
  }


  updateClient(client: IClient): Observable<IClient> {
    const url = this.clientUrl + `/${client._id}`;

    return this.http.put<IClient>(url, client, this.httpOptions)
      .pipe(
        tap<IClient>(() => {
          this.log(`Updated client with id = ${client._id} and name = ${client.name}`);
        }),
        catchError((error) => {
          this.log(`Failed` + error.body.error);
          return of(undefined);
        }));
  }

  // httpOptions = {
  //   headers: new HttpHeaders({'Content-Type': 'application/json'})
  // };

  addClient(client: IClient): Observable<IClient> {
    const url = this.clientUrl;
    return this.http.post<IClient>(url, client, this.httpOptions)
      .pipe(
        tap<IClient>((c => this.log(`added client with name = ` + c.name + `new ID = ` + c._id))),
        catchError((error) => {
          this.log(`Failed adding client with name: ` + client.name + error.body.error);
          return of(undefined);
        })
      );

  }

  deleteClient(client: IClient ) : Observable<IClient>{
    const id = typeof client === `number` ? client : client._id;
    const url = `${this.clientUrl}/${id}`;

    return this.http.delete<IClient>(url, this.httpOptions).
    pipe(
      tap<IClient>(() => {
        this.log(`Deleted hero with named = ${client.name} ID = ${client._id}  `);
      }),
      catchError((error) => {
        this.log(`Failed` + error.body.error);
        return of(undefined);
      }));

  }


  searchClient(term: string): Observable<IClient[]> {
    term = term.trim();
    if (!term) {
      return of([]);
    }
    const url = this.clientUrl + `/?name=${term}`;
    return this.http.get<IClient[]>(url)
      .pipe(
        tap<IClient[]>((results) => {
          if (results.length > 0) {
            this.log(`found results`)
          } else {
            this.log(`didn't find results`)
          }

        })
      )
  }


}
