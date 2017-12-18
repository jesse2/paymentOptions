import { Component, OnInit } from '@angular/core';
import { BraintreeService } from '../../services/braintree.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-response',
  templateUrl: './response.component.html',
  styleUrls: ['./response.component.css']
})
export class ResponseComponent implements OnInit {

  result: any;
  ras:any;

  constructor(private btService:BraintreeService,
  private router:Router) { }

  ngOnInit() {
    this.btService.getTransaction(this.btService.tokenId).subscribe(res=>{
      this.result=res;
      this.ras=JSON.stringify(res);
    },
    err=>{
      //console.log(err);
      return false;
    });
  }

}
