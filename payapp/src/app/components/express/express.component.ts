import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { BraintreeService } from '../../services/braintree.service';
import * as jQuery from 'jquery';

declare var jquery:any;
declare var $:any;
declare let paypal:any;


@Component({
  selector: 'app-express',
  templateUrl: './express.component.html',
  styleUrls: ['./express.component.css']
})
export class ExpressComponent implements OnInit {
  constructor(private http:Http,
  private router:Router,
  private btService:BraintreeService) { }

  ngOnInit() {

    $.getScript('https://www.paypalobjects.com/api/checkout.js',()=>{
      paypal.Button.render({
        env: 'sandbox', // Or 'sandbox',
  
        commit: true, // Show a 'Pay Now' button
  
        style: {
          color: 'blue',
          size: 'medium',
          shape:'rect'
        },
  
        payment: (data, actions)=> {
          return actions.request.post('/paypal/create-payment1')
          .then(function(res) { 
            //console.log("Access Token: "+res); 
            return actions.request.get('/paypal/create-payment2/'+res)
            .then(function(res){
              return res;
            });       
          });
        },
  
        onAuthorize: (data, actions)=> {
          /* 
           * Execute the payment here 
           */
          //console.log("Clicked on submit payment");

          var paymentID=data.paymentID;
          var payerID=data.payerID;

          this.http.post('/paypal/create-payment1',data).subscribe(res=>{
            //console.log(res.text());
            var token=res.text();
            // console.log("token 1: "+token);

            // console.log("Payment ID: "+data.paymentID);
            // console.log("Payer ID: "+data.payerID);
            var dat={
              newtoken:token,
              'paymentID':data.paymentID,
              'payerID': data.payerID
            }
            this.http.post('/paypal/execute-payment/'+ token+'/'+data.paymentID+'/'+data.payerID, dat).subscribe(resp=>{

              //console.log(resp.text());
              this.btService.ppres=resp.json();
              this.router.navigate(['/ppresponse']);
            },
            err=>{
              return false;
            });
          },
        err=>{
          return false;
        });
          
        },
  
        onCancel: (data, actions)=> {
          /* 
           * Buyer cancelled the payment 
           */
        },
  
        onError: (err)=> {
          /* 
           * An error occurred during the transaction 
           */
          console.log(err);
        }
      }, '#paypal-button');
    });
}



}
