import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import {IHero} from '../models/IHero';
import {IClient} from '../models/IClient';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 11, name: 'Dr Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];

    const clients = [
      { id: 11, name: 'Donald Trump' },
      { id: 12, name: 'Vladimir Putin' },
      { id: 13, name: 'Bibi Netaniau' },
      { id: 14, name: 'Zoran Tegeltija' },
      { id: 15, name: 'Manuel Marrero Cruz' },
      { id: 16, name: 'Xi Jinping' },
      { id: 17, name: 'Narendra Modi' },
      { id: 18, name: 'Fayez al-Sarraj' },
      { id: 19, name: 'Imran Khan' },
      { id: 20, name: 'Nguyễn Xuân Phúc' }
    ];
    return {heroes, clients};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.


  // genId(heroes: IHero[]): number {
  //   return heroes.length > 0 ? Math.max(...heroes.map(hero => hero._id)) + 1 : 1;
  // }
  genId<T extends IHero | IClient>(costumers:T[]) :number {
  return costumers.length > 0 ? Math.max(...costumers.map(costumer => costumer._id)) + 1 : 1;
}

}
