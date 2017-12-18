import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BraintreeService {
  tokenId;
  ppres;
  result: any;

  constructor(private http:Http) { }

  getToken(){
    return this.http.get("/braintree/client_token")
    .map(res => this.result= res.text());
  }

  sendInfo(nonce){
    return this.http.post("/braintree/checkout/"+nonce,nonce)
    .map(res => this.result= res.text());
  }

  getTransaction(id){
    
    return this.http.get("/braintree/checkout/"+id)
    .map(res => this.result= res.json());
  }

}
