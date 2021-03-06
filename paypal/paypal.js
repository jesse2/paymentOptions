var express=require('express');
var router=express.Router();
var paypal=require('paypal-rest-sdk');
var request=require('request');

router.post('/create-payment1', async function(req,res){
    var auth={
        user:'',
        pass:''
    };

     await request.post({url:'https://api.sandbox.paypal.com/v1/oauth2/token', body:'grant_type=client_credentials', auth:auth}, (e,r,body)=>{
    var huu=JSON.parse(body);
    res.send(huu.access_token);
    });
});

router.get('/create-payment2/:token', async function(req,res){
    var auth={
        bearer:req.params.token
    };
    var uri='https://api.sandbox.paypal.com/v1/payments/payment';
    var body={
        intent: 'sale',
              payer: {
                payment_method: 'paypal'
              },
              transactions: [{
                  amount: { total: '10.00', currency: 'USD' }
              }],
              redirect_urls: {
                return_url: 'https://www.mysite.com',
                cancel_url: 'https://www.mysite.com'
              }
    }
    await request.post({uri:uri,body:body, json:true, auth:auth },(e,r,body)=>{
        res.send(body.id);
    });
});

router.post('/execute-payment/:info/:info2/:info3', async function(req,res){
let ato=req.params.info;
let paymentID=req.params.info2;
let payerID=req.params.info3;
var auth={
    bearer:ato
};

var body={
    payer_id:payerID
};

var uri=`https://api.sandbox.paypal.com/v1/payments/payment/${paymentID}/execute`;
await request.post({uri:uri, auth:auth, json:true,body:body},(e,r,body)=>{
//res.json(body);
res.send(body);
});
});

module.exports=router;
