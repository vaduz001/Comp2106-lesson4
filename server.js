// link to the connect package
var connect = require('connect');

// link to the url module
var url = require('url');

// create a new app using connect
var app = connect();

// link to accounting module

var accounting = require ('accounting');

// create a helloworld request / response
var helloWorld = function(req, res, next) {
    // set the header
    res.writeHead(200, {
        'Content-Type': 'text-json'
    });

    // send a hello response
    res.end('{ "name": "Rich", "age": 25 } ');
};

var goodbyeWorld = function(req, res, next) {
    res.writeHead(200, {
        'Content-Type': 'text-plain'
    });

    res.end('Goodbye World');
};

var calculateTax = function(req, res, next) {
    // get the subtotal from url's querystring
    var qs = url.parse(req.url, true).query;

    // get the subtotal from the querystring
    var subTotal = qs.subtotal;

    // calculate tax
    var tax = parseFloat(subTotal) * 0.13;

    // calculate total
    var total = accounting.formatMoney(parseFloat(subTotal) + tax);

    res.writeHead(200, {
        "Content-Type": "text-plain"
    });

    // display results
    res.write('SubTotal: ' + subTotal + '\n');
    res.write('Tax: ' + tax + '\n');
    res.write('Total: ' + total);

    res.end();
};


var loop = function(req, res, next) {
    //
    res.writeHead(200, { 'Content-Type': 'text-plain' });

    for (var i = 1; i<= 20; i++) {
        res.write(i + '\n');
        console.log(i);
    }

    res.end();

};

// route each url to proper function
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);
app.use('/tax-calculator', calculateTax);
app.use('/loop', loop);
// show this as home page




// listen for events
app.listen(3000);
console.log('Connect app running at http://localhost:3000');/**
 * Created by Vadim on 2/2/2016.
 */

