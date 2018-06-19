var express=require('express');
var router=express.Router();
var braintree=require('braintree');

var gateway=braintree.connect({
    environment : braintree.Environment.Sandbox,
    merchantId: "",
    publicKey: "",
    privateKey: ""
});

//initial token request
router.get('/client_token', function(req,res){
    gateway.clientToken.generate({}, function(err,response){
        res.send(response.clientToken);
    });
});

//sending nonce to server
router.post("/checkout/:nonce", function (req, res) {
    var nonceFromTheClient=req.params.nonce;
    // Use payment method nonce here
    gateway.transaction.sale({
        amount: "10.00",
        paymentMethodNonce: nonceFromTheClient,
        options: {
            submitForSettlement: true
        }
        }, function (err, result) {
            if(result)
            {
                //console.log(result.transaction);
                res.send(result.transaction.id);
            }
        });
    });
    
    
  router.get("/checkout/:id", function(req,res){
        var transid=req.params.id;
      gateway.transaction.find(transid, function(err,transaction){
          //console.log(transaction);
          res.send(transaction);
      });
    });

    module.exports=router;
