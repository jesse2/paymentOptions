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
    return this.http.get("https://jesusacastaneda.com/node/client_token")
    .map(res => this.result= res.text());
  }

  sendInfo(nonce){
    return this.http.post("https://jesusacastaneda.com/node/checkout",nonce)
    .map(res => this.result= res.text());
  }

  getTransaction(id){
    return this.http.post("https://jesusacastaneda.com/node/paymentinfo",id)
    .map(res => this.result= res.json());
  }

}
