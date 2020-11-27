import {Component, OnInit} from '@angular/core';
import {IClient} from '../models/IClient';
import {ClientService} from '../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-client-detail',
  templateUrl: './client-detail.component.html',
  styleUrls: ['./client-detail.component.css']
})
export class ClientDetailComponent implements OnInit {

  client: IClient = {name: ``, _id: 0};

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get(`client-id`);
    if (id) {
      this.clientService.getClient(id)
        .subscribe(client => this.client = client);
    }

  }

  goBack() {
    this.location.back();
  }

  saveClient(): void {

    this.clientService.updateClient(this.client)
      .subscribe(() => this.goBack());
  }


}
