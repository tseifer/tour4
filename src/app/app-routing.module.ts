import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroDetialComponent} from './hero-detial/hero-detial.component';
import {HeroesListComponent} from './heroes-list/heroes-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddHeroComponent} from './add-hero/add-hero.component';
import {SearchHeroComponent} from './search-hero/search-hero.component';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientDetailComponent} from './client-detail/client-detail.component';



const routes: Routes = [
  {path: `heroes`,component: HeroesListComponent},
  {path: `clients`,component: ClientsListComponent},
  {path: `dashboard`,component: DashboardComponent},
  {path: `add-hero`,component: AddHeroComponent},
  {path: `search-hero`,component: SearchHeroComponent},
  {path: ``,redirectTo:"/dashboard", pathMatch: `full`},
  {path: `client-detail/:client-id`,component: ClientDetailComponent},
  {path: `hero-detail/:hero-id`,component: HeroDetialComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
