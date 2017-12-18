import { Component, OnInit } from '@angular/core';
import { BraintreeService } from '../../services/braintree.service';
import { Router } from '@angular/router';
import * as braintree from 'braintree-web';

@Component({
  selector: 'app-hosted',
  templateUrl: './hosted.component.html',
  styleUrls: ['./hosted.component.css']
})
export class HostedComponent implements OnInit {

  constructor(private btService:BraintreeService,
    private router:Router) { }

  ngOnInit() {
    var submit=document.querySelector('input[type="submit"]');
    var form = document.querySelector('#my-sample-form');

    this.btService.getToken().subscribe(res=>{
      braintree.client.create({
        authorization:res
      },(clientErr,clientInstance)=>{
        if(clientErr){
          console.log(clientErr);
          return;
        }

        braintree.hostedFields.create({
          client:clientInstance,
          styles: {
            'input': {
              'font-size': '14px'
            },
            'input.invalid': {
              'color': 'red'
            },
            'input.valid': {
              'color': 'green'
            }
          },
          fields: {
            number: {
              selector: '#card-number',
              placeholder: '4111 1111 1111 1111'
            },
            cvv: {
              selector: '#cvv',
              placeholder: '123'
            },
            expirationDate: {
              selector: '#expiration-date',
              placeholder: '10/2019'
            }
          }
        }, (hostedFieldsErr,hostedFieldsInstance)=>{
          if(hostedFieldsErr){
            console.log(hostedFieldsErr);
            return;
          }
          submit.removeAttribute('disabled');
          form.addEventListener('submit',(event)=>{
            event.preventDefault();

            hostedFieldsInstance.tokenize((tokenizeErr,payload)=>{
              if(tokenizeErr){
                console.log(tokenizeErr);
                return;
              }

              this.btService.sendInfo(payload.nonce).subscribe(res=>{
                this.btService.tokenId=res;
                this.router.navigate(['/response']);
              },
              err=>{
                //console.log(err);
                return false;
              });
            });
          });
        });
      });
    },
    err=>{
      //console.log(err);
      return false;
    });      
  }

}
