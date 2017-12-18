var express=require('express');
var path=require('path');
var cors=require('cors');

var app=express();
var port=3000;

var bt=require('./braintree/braintree');
var pp=require('./paypal/paypal');

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req,res)=>{
    res.send('up and running with express');
});

app.use('/braintree',bt);
app.use('/paypal', pp);

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(port,()=>{
    console.log('server application started on port '+port);
});