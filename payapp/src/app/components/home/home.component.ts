import { Component, OnInit } from '@angular/core';
import { BraintreeService } from '../../services/braintree.service';
import { Router } from '@angular/router';
import * as dropin from 'braintree-web-drop-in';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  result:any;
  braintreeIsReady: boolean;
  dropIninstance: any;
  private options;
  constructor(private btService:BraintreeService,
  private router:Router) { }

  ngOnInit() {
    this.options={
      authorization:"",
      selector:"#dropin-container",
      card:{
        cardholderName:true
      },
      paypal:{
        flow:'checkout',
        amount:'10.00',
        commit:true,
        currency:'USD',
        buttonStyle:{
          color:'black',
          shape:'rect',
          size:'medium',
          tagline:false
        }
      },
      paypalCredit:{
        flow:'checkout',
        amount:'10.00',
        currency:'USD',
        buttonStyle:{
          color:'black',
          shape:'rect',
          size:'medium',
          tagline:false
        }
      }
    };

    this.btService.getToken().subscribe(res=>{
      this.options.authorization=res;
      dropin.create(this.options, (err, dropinInstance) => {
        if (err) {
          // Handle any errors that might've occurred when creating Drop-in
          console.error(err);
          return;
        }
        this.dropIninstance = dropinInstance;
        this.braintreeIsReady = true;
      });
    },
    err=>{
      //console.log(err);
      return false;
    });
  }

  submitPayment(){
    this.dropIninstance.requestPaymentMethod((err,payload)=>{
      this.btService.sendInfo(payload.nonce).subscribe(res=>{
        this.btService.tokenId=res;
        this.result=res;
        this.router.navigate(['/response'])
      },
      err=>{
        //console.log(err);
        return false;
      });
    });
  }

}
