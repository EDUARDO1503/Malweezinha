import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { RequestOrderComponent } from '../request-order/request-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orders : Array<any> =[]; 
  filterTerm : string = '';

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list(); 
  }


  public async list(){
    this.orders = await this.httpService.get('group');
    if (this.filterTerm.length > 0){
      this.orders = await this.httpService.get('groupsearch/' + this.filterTerm);
      console.log(this.orders)
    }
  }

  public openModal(){
    const dialog = this.dialog.open(RequestOrderComponent, {
      width: '800px',
    });
    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }
}
