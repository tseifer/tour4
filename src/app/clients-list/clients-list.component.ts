import { Component, OnInit } from '@angular/core';
import {MessagesService} from '../services/messages.service';
import {Router} from '@angular/router';
import {IClient} from '../models/IClient';
import {ClientService} from '../services/client.service';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.css']
})
export class ClientsListComponent implements OnInit {

  clients: IClient[];
  selectedClient: IClient;

  constructor(private clientService: ClientService , private messageService: MessagesService, private router : Router) { }

  ngOnInit(): void {
    this.getClients();

  }

  private getClients() {
    this.clientService.getClients()
      .subscribe((data: IClient[]) => this.clients = data);
  }

  onSelect(client: IClient){
    this.messageService.addMassage('Client Selected:  Client' + client.name );
    this.router.navigate([`client-detail`, client._id]),
      this.selectedClient = client;
  }

  delete(client: IClient): void{
    this.clients = this.clients.filter(h => h !== client);
    this.clientService.deleteClient(client).subscribe();
  }

}
