import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';
import { QuestionService } from 'src/services/question.service';
import { RegisterRequestProdComponent } from '../register-request-prod/register-request-prod.component';

@Component({
  selector: 'app-request-order',
  templateUrl: './request-order.component.html',
  styleUrls: ['./request-order.component.scss']
})
export class RequestOrderComponent implements OnInit {
  orders : Array<any> =[]; 
  filterTerm : string = '';
  
  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
  }


  public openModal(){
    const dialog = this.dialog.open(RegisterRequestProdComponent, {
      width: '450px',
    });
    dialog.afterClosed().subscribe((result : any) => {
    
    })
  }
}
