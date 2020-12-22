import { Component } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Heroes & Clients';

  showAddHero=true;


  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    console.log(this.activatedRoute)
  }

  async logout() {
    await this.authService.logout();

  }
}
