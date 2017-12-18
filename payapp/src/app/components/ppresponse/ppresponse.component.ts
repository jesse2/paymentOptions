import { Component, OnInit } from '@angular/core';
import { BraintreeService } from '../../services/braintree.service';

@Component({
  selector: 'app-ppresponse',
  templateUrl: './ppresponse.component.html',
  styleUrls: ['./ppresponse.component.css']
})
export class PpresponseComponent implements OnInit {

  result:any;
  ras:any;

  constructor(private btService:BraintreeService) { }

  ngOnInit() {
    this.ras=JSON.stringify(this.btService.ppres);
    this.result=this.btService.ppres;  
  }

}
