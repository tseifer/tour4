import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeroDetialComponent} from './hero-detial/hero-detial.component';
import {HeroesListComponent} from './heroes-list/heroes-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AddHeroComponent} from './add-hero/add-hero.component';
import {SearchHeroComponent} from './search-hero/search-hero.component';
import {ClientsListComponent} from './clients-list/clients-list.component';
import {ClientDetailComponent} from './client-detail/client-detail.component';
import {LoginComponent} from "./login/login.component";
import {AuthGuardService} from "./services/auth-guard.service";



const routes: Routes = [
  {path: `heroes`,component: HeroesListComponent, canActivate : [AuthGuardService] },
  {path: `clients`,component: ClientsListComponent, canActivate : [AuthGuardService]},
  {path: `dashboard`,component: DashboardComponent, canActivate : [AuthGuardService]},
  {path: `add-hero`,component: AddHeroComponent, canActivate : [AuthGuardService]},
  {path: `search-hero`,component: SearchHeroComponent, canActivate : [AuthGuardService]},
  {path: ``,redirectTo:"/dashboard", pathMatch: `full`, canActivate : [AuthGuardService]},
  {path: `client-detail/:client-id`,component: ClientDetailComponent, canActivate : [AuthGuardService]},
  {path: `hero-detail/:hero-id`,component: HeroDetialComponent, canActivate : [AuthGuardService]},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
