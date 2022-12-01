import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

import { QuestionService } from 'src/services/question.service';
import { SubGroupModalComponent } from '../sub-group-modal/sub-group-modal.component';
import { ProductModalComponent } from '../product-modal/product-modal.component';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  groups : Array<any> =[]; 
  filterTerm : string = '';
  products : Array<any> =[]; 

  constructor(private httpService : HttpService, public dialog: MatDialog, private question: QuestionService) { }

  ngOnInit(): void {
    this.list()
  }

  public async list(){
    this.products = await this.httpService.get('product');
  }

  public openModal(){
    const dialog = this.dialog.open(ProductModalComponent, {
      width: 'auto', height: 'auto'
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

  public openModalEdit(product : any){
    const dialog = this.dialog.open(EditProductComponent, {
      width: '450px',
      data : product
    });

    dialog.afterClosed().subscribe((result : any) => {
      this.list();
    })
  }

   
  public async deleteSubGroup(id : number){
  this.question.ask(async () => {
    await this.httpService.patch('product', {id});
    this.list();
  })
  }    

}
