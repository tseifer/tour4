import {Component, Input, OnInit} from '@angular/core';
import {IHero} from '../models/IHero';
import {HeroService} from '../services/hero.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detial',
  templateUrl: './hero-detial.component.html',
  styleUrls: ['./hero-detial.component.css']
})
export class HeroDetialComponent implements OnInit {

  //@Input()
  hero : IHero = {name:'',_id :0};


  constructor(private heroService: HeroService,
              private activatedRoute: ActivatedRoute,
              private router : Router,
              private location: Location
              ) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get(`hero-id`);
    if(id){
      this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero)
    }
  }



  goBack(){
    this.location.back()
  }

  saveHero(): void{

    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack())
  }

}
