import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { EditAdressComponent } from '../edit-adress/edit-adress.component';
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss']
})
export class EditClientComponent implements OnInit {
  id : string = '';
  nameFantasy : string = '';
  socialReason : string = '';
  CNPJ : string = '';
  clientSince : Date = new Date ();
  adresses : Array<any> = [];
  selectedClient = 0;
  street : String = ''
  city: String = '';
  state: String = '';
  cep = '';
  number = '';
  district : String = '';
  fkclient : number = 0
  complement : String = '';
  name : String = '';
  address : Array<any> = [];
  adress : string = '';
  filterTerm : string = '';

  clients : Array<any> = [];

  constructor(public dialogRef: MatDialogRef<EditClientComponent>, private httpService : HttpService, public dialog: MatDialog,
      @Inject(MAT_DIALOG_DATA) public data: any, private question: QuestionService) { }
 
  async ngOnInit() {
    this.list();
    this.clients = await this.httpService.get('client');
    if(this.data){
      this.nameFantasy = this.data.nameFantasy;
      this.socialReason = this.data.socialReason;
      this.CNPJ = this.data.CNPJ;
      this.clientSince = this.data.clientSince;
    }
  }

  public async list(){
    this.clients = await this.httpService.get('client');
    if (this.filterTerm.length > 0){
      this.clients = await this.httpService.get('client/' + this.filterTerm);
      console.log(this.clients)
    }
  }

  public async change(){
    await this.httpService.put('client', {nameFantasy : this.nameFantasy, socialReason:  this.socialReason, 
      CNPJ : this.CNPJ, clientSince : this.clientSince, id : this.data.id});
  }

  public cancel(){
    this.dialog.closeAll();
  }

  public openModalEdit(adress : any){
    const dialog = this.dialog.open(EditAdressComponent, {
      width: 'auto', height : 'auto',
      data : adress
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async addEndereco(){
    this.question.ask(async () => {
    this.address.push({"street":this.street,"district":this.district, "city":this.city, "state":this.state,
    "cep":this.cep, "number":this.number, "complement":this.complement})
    this.reset();
    console.log(this.address);
  })
    }

    public async add(){
      this.clients =  await this.httpService.post('client',
    {nameFantasy : this.nameFantasy, socialReason : this.socialReason,
     CNPJ : this.CNPJ, clientSince : this.clientSince, address:this.address})
        this.onNoClick()
    }
      onNoClick(): void {
        this.dialogRef.close();
      }

      public async reset(){
        this.district= '',
        this.number= '',
        this.complement= '',
        this.city= '',
        this.state= '',
        this.street= '',
        this.cep = '';
      }

}