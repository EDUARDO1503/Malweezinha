import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/services/http.service';
import {MatDialog} from '@angular/material/dialog';

import { QuestionService } from 'src/services/question.service';
import { UserModalComponent } from '../user-modal/user-modal.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users : Array<any> =[]; 
  name = '';
  filterTerm : string = '';
  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){
    this.users = await this.httpService.get('user');
    if (this.filterTerm.length > 0){
      this.users = await this.httpService.get('groupsearch/' + this.filterTerm);
      console.log(this.users)
    }

  }

  public openModal(){
    const dialog = this.dialog.open(UserModalComponent, {
      width: '450px'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(user : any){
    const dialog = this.dialog.open(EditUserComponent, {
      width: '450px',
      data : user
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public async deleteGroup(id : number){
    this.question.ask(async () => {
      await this.httpService.patch('user', {id});
      console.log(Response);
      this.list();
    })
    } 
}
