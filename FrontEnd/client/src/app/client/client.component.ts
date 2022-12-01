import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { ClientAdressComponent } from '../client-adress/client-adress.component';
import { EditClientComponent } from '../edit-client/edit-client.component';
import { ClientModalComponent } from '../client-modal/client-modal.component';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  clients : Array<any> =[]; 
  adresses : Array<any> = [];
  nameFantasy = '';
  socialReason = '';
  CNPJ = '';
  clientSince = '';
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){
    this.clients = await this.httpService.get('client');
    if (this.filterTerm.length > 0){
      this.clients = await this.httpService.get('client/' + this.filterTerm);
      console.log(this.clients)
    }
  }

  public openModal(){
    const dialog = this.dialog.open(ClientModalComponent, {
      width: 'auto', height : 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }
  
  public openModalEdit(client : any){
    const dialog = this.dialog.open(ClientModalComponent, {
      width : 'auto', height : 'auto',
      data  : {id : client.id}
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openaddadress(client : any){
    const dialog = this.dialog.open(ClientAdressComponent, {
      width: '450px',
      data : client
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async deleteGroup(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('client', {id});
      console.log(Response);
      this.list();
    })
    } 

    public async deleteAdress(id : number){
      this.question.ask(async () => {
        await this.httpService.patch('adress', {id});
        console.log(Response);
      })
      } 

      
}
